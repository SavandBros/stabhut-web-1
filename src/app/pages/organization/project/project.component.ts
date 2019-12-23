import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiPayload } from '@app/interfaces/api-payload';
import { ApiResponse } from '@app/interfaces/api-response';
import { Card } from '@app/interfaces/card';
import { Chat } from '@app/interfaces/chat';
import { Column } from '@app/interfaces/column';
import { Project } from '@app/interfaces/project';
import { Task } from '@app/interfaces/task';
import { User } from '@app/interfaces/user';
import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';
import { CardNewComponent } from '@app/shared/card-new/card-new.component';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  /**
   * Determines whether to open or close chat list
   */
  openChat: boolean;

  /**
   * Current authenticated user
   */
  user: User;

  /**
   * Selected project of this organization
   */
  projectSelected: Project;

  /**
   * List of users of current organization
   */
  users: User[] = [];

  /**
   * List of projects of current organization
   */
  projects: Project[] = [];

  /**
   * Show chats or tasks in the side panel (default view is chats)
   */
  sidePanelTab: 'chats' | 'tasks' = 'chats';

  /**
   * Side panel input model
   */
  sidePanelInput: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService,
              private api: ApiService,
              private modal: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Get and watch authenticated user
     */
    this.auth.user.subscribe((data: User): void => {
      this.user = data;
    });
    /**
     * Get and watch params (organization)
     */
    this.route.params.subscribe((params: Params): void => {
      /**
       * Get organization projects
       */
      this.api.getProjects(params.id).subscribe((projects: Project[]): void => {
        this.projects = projects;
        /**
         * Get and watch query params (project)
         */
        this.route.queryParams.subscribe((queryParams: Params): void => {
          /**
           * Get selected project from params matching the loaded projects
           */
          this.projectSelected = this.projects.find(project => project.id === Number(queryParams.project));
          /**
           * Load project data if project was set and found from params, otherwise select first project
           */
          if (!this.projectSelected && !queryParams.project) {
            this.router.navigate(['.'], {
              relativeTo: this.route,
              queryParams: { project: this.projects[0].id },
            });
          } else if (this.projectSelected && !this.projectSelected.columns) {
            /**
             * Get project chats
             */
            this.api.getChats(this.projectSelected.id).subscribe((chats: Chat[]): void => {
              this.projectSelected.chats = chats.reverse();
            });
            /**
             * Get project tasks
             */
            this.api.getTasks(this.projectSelected.id).subscribe((tasks: Task[]): void => {
              this.projectSelected.tasks = tasks;
            });
            /**
             * Get project columns
             */
            this.api.getColumns(null, this.projectSelected.id).subscribe((columns: Column[]): void => {
              this.projectSelected.columns = columns;
              // Load cards of each column
              for (const column of columns) {
                this.api.getCards(column.id).subscribe((cards: Card[]): void => {
                  column.cards = cards;
                });
              }
            });
          }
        });
      });
      /**
       * Get organization users
       */
      this.api.getUsers().subscribe((data: ApiResponse<User>): void => {
        this.users = data.results;
      });
    });
  }

  /**
   * @returns User data
   * @param id User ID to get data
   */
  getUser(id: number): User {
    return this.users.filter((user: User) => user.id === id)[0];
  }

  /**
   * Open up the modal to add card in
   *
   * @param column Column to add card to
   */
  addCard(column: Column): void {
    this.modal.show(CardNewComponent, {
      class: 'modal-dialog-centered',
      initialState: {
        users: this.users,
        column,
      },
    });
  }

  /**
   * Called when user enters an input in the side panel
   */
  sidePanelSubmit(): void {
    if (this.sidePanelTab === 'chats') {
      // Create a new chat for this project
      this.addChat(this.sidePanelInput);
    } else if (this.sidePanelTab === 'tasks') {
      // Create a new task for this project
      this.addTask(this.sidePanelInput);
    }
    // Clear input
    this.sidePanelInput = '';
  }

  /**
   * Send a message/chat to project
   *
   * @param content Chat content
   */
  addChat(content: string): void {
    this.api.createChat({
      content,
      project: this.projectSelected.id,
    }).subscribe((chat: Chat): void => {
      chat.user = this.user.id;
      this.projectSelected.chats.push(chat);
    });
  }

  /**
   * Create a new task for the project
   *
   * @param content Task content
   */
  addTask(content: string): void {
    this.api.createTask({
      content,
      project: this.projectSelected.id,
    }).subscribe((task: Task): void => {
      this.projectSelected.tasks.unshift(task);
    });
  }

  /**
   * Check or uncheck a task (toggle)
   *
   * @param task Task to mark as (un)done or (un)checked
   */
  taskToggle(task: Task): void {
    this.api.updateTask(task.id, {
      checked: task.checked,
    }).subscribe();
  }

  /**
   * Update a card property
   *
   * @param id Card ID
   * @param index Card index
   * @param column Card column
   * @param payload Card properties
   */
  updateCard(id: number, index: number, column: Column, payload: ApiPayload): void {
    column.cards[index].loading = true;
    this.api.updateCard(id, payload).subscribe((data: Card): void => {
      column.cards[index] = data;
      column.cards[index].loading = false;
    });
  }

  /**
   * On card drag and drop
   *
   * @param event Event emitted when the user drops a draggable item inside a drop container
   * @param column Column that card has been dropped in
   */
  drop(event: CdkDragDrop<Card[]>, column: Column): void {
    // Previous card
    const previousCard: Card = column.cards[event.currentIndex - 1];
    // Next card
    const nextCard: Card = column.cards[event.currentIndex + 1];
    // Set order
    const order: number = ((previousCard ? previousCard.order : 0) + (nextCard ? nextCard.order : 0)) / 2;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateCard(event.item.data.id, event.currentIndex, column, { order });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateCard(event.item.data.id, event.currentIndex, column, { column: column.id, order: event.currentIndex });
    }
  }
}
