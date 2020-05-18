import { transferArrayItem, moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { ApiPayload } from '@app/interfaces/api-payload';
import { ApiResponse } from '@app/interfaces/api-response';
import { Card } from '@app/interfaces/card';
import { Chat } from '@app/interfaces/chat';
import { Column } from '@app/interfaces/column';
import { Project } from '@app/interfaces/project';
import { Task } from '@app/interfaces/task';
import { User } from '@app/interfaces/user';
import { OrganizationBase } from '@app/pages/organization/shared/organization-base';
import { ApiService } from '@app/services/api.service';
import { AuthService } from '@app/services/auth.service';
import { CardModalComponent } from '@app/shared/card-modal/card-modal.component';
import { CardNewComponent } from '@app/shared/card-new/card-new.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent extends OrganizationBase implements OnInit {

  /**
   * Determines whether to open or close chat list
   */
  openChat: boolean;

  /**
   * Current authenticated user
   */
  user: User;

  /**
   * List of loaded columns
   */
  columns: Column[];

  /**
   * List of loaded cards
   */
  cards: Card[];

  /**
   * List of loaded chats
   */
  chats: Chat[];

  /**
   * List of loaded tasks
   */
  tasks: Task[];

  /**
   * Selected project of this organization
   */
  projectSelected: Project;

  /**
   * Selected card of selected project
   */
  cardSelected: Card;

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
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    /**
     * Get and watch authenticated user
     */
    this.auth.user.subscribe((data: User): void => {
      this.user = data;
    });
    /**
     * Watch modal close
     */
    this.modal.onHidden.subscribe((): void => {
      if (this.route.snapshot.queryParams.card) {
        this.router.navigate(['.'], {
          queryParamsHandling: 'merge',
          queryParams: { card: null },
          relativeTo: this.route,
        });
        this.cardSelected = null;
      }
    });
  }

  onInitiation(): void {
    /**
     * Get and watch params (organization)
     */
    this.route.params.subscribe((params: Params): void => {
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
        } else if (this.projectSelected) {
          /**
           * Get chats
           */
          this.api.getChats({ project: this.projectSelected.id.toString() }).subscribe((chats: Chat[]): void => {
            this.chats = chats.reverse();
          });
          /**
           * Get tasks
           */
          this.api.getTasks({ project: this.projectSelected.id.toString() }).subscribe((tasks: Task[]): void => {
            this.tasks = tasks;
          });
          /**
           * Get columns
           */
          this.api.getColumns({
            project: this.projectSelected.id.toString(),
          }).subscribe((columns: Column[]): void => {
            this.columns = columns;
            // Load cards of each column
            for (const column of columns) {
            }
          });
          /**
           * Get cards
           */
          this.api.getCards({ project: this.projectSelected.id.toString() }).subscribe((cards: Card[]): void => {
            this.cards = cards;
            this.handleQueryParams();
          });
        }
      });
      /**
       * Get organization users
       */
      this.api.getUsers().subscribe((data: ApiResponse<User>): void => {
        this.users = data.results;
      });
    });
    /**
     * Watch query param changes
     */
    this.route.queryParams.subscribe((queryParams: ParamMap): void => {
      this.handleQueryParams(queryParams);
    });
  }

  handleQueryParams(queryParams: Params = this.route.snapshot.queryParams) {
    if (!this.projectSelected || !this.columns || this.cardSelected) {
      return;
    }
    this.cardSelected = this.cards.find(card => card.id === Number(queryParams.card));
    if (this.cardSelected) {
      this.api.getCard(this.cardSelected.id).subscribe((card: Card): void => {
        this.cardSelected = card;
        this.modal.show(CardModalComponent, {
          class: 'modal-lg',
          initialState: {
            card: this.cardSelected,
            columns: this.columns,
          },
        }).content.update.subscribe((data: Card): void => {
          const updatedCard: Card = this.cards.find(item => item.id === data.id);
          Object.assign(updatedCard, data);
        });
      });
    }
  }

  /**
   * Open up the modal to add card in
   * @todo Watch for adding card and add it to the view
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
      this.chats.push(chat);
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
      this.tasks.unshift(task);
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
    this.cards[index].loading = true;
    this.api.updateCard(id, payload).subscribe((data: Card): void => {
      this.cards[index] = data;
      this.cards[index].loading = false;
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
    const previousCard: Card = this.cards[event.currentIndex - 1];
    // Next card
    const nextCard: Card = this.cards[event.currentIndex + 1];
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
      this.updateCard(event.item.data.id, event.currentIndex, column, {
        column: column.id,
        order: event.currentIndex,
      });
    }
  }

  /**
   * @returns Filtered cards of a column
   */
  getColumnCards(column: Column): Card[] {
    if (this.cards) {
      return this.cards.filter(card => card.column === column.id);
    }
  }
}
