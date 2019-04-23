import { Component, OnInit } from '@angular/core';
import { UIRouter } from '@uirouter/core';
import { BsModalService } from 'ngx-bootstrap';

import { Column } from '../../models/column';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { User } from '../../models/user';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { CardNewComponent } from '../card-new/card-new.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * Current authenticated user
   */
  user: User;

  /**
   * Current organization ID from route
   */
  organization: number;

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
  sidePanelTab = 'chats';

  /**
   * Side panel input model
   */
  sidePanelInput: string;

  /**
   * Selected project
   */
  projectSelected: Project;

  constructor(private router: UIRouter,
              private authService: AuthService,
              private apiService: ApiService,
              private modalService: BsModalService) {
    // Get organization ID from route params
    this.organization = router.globals.params.id;
  }

  ngOnInit(): void {
    // Get authenticated user
    this.authService.user.subscribe(data => {
      this.user = data;
    });
    // Get all users
    this.apiService.getUsers().subscribe((response) => {
      this.users = response.results;
      // Get all projects of this organization
      this.apiService.getProjects(this.organization).subscribe((data) => {
        this.projects = data;
        // Select the first project
        this.selectProject(data[0]);
      });
    });
  }

  /**
   * Select a project and load its data only once
   *
   * @param project Project to select
   */
  selectProject(project: Project): void {
    // Change selected project
    this.projectSelected = project;
    // If project columns are not loaded
    if (!project.columns) {
      // Load project chats
      this.apiService.getChats(project.id).subscribe((chats) => {
        project.chats = chats.reverse();
      });
      // Load project tasks
      this.apiService.getTasks(project.id).subscribe((tasks) => {
        project.tasks = tasks;
      });
      // Load project columns
      this.apiService.getColumns(project.id).subscribe((columns) => {
        project.columns = columns;
        // Load cards of each column
        for (const column of columns) {
          this.apiService.getCards(column.id).subscribe((cards) => {
            column.cards = cards;
          });
        }
      });
    }
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
    this.modalService.show(CardNewComponent, {
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
    this.apiService.createChat({
      content,
      project: this.projectSelected.id,
    }).subscribe((chat) => {
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
    this.apiService.createTask({
      content,
      project: this.projectSelected.id,
    }).subscribe((task) => {
      this.projectSelected.tasks.unshift(task);
    });
  }

  /**
   * Check or uncheck a task (toggle)
   *
   * @param task Task to mark as (un)done or (un)checked
   */
  taskToggle(task: Task) {
    this.apiService.updateTask(task.id, {
      checked: task.checked,
    }).subscribe();
  }
}
