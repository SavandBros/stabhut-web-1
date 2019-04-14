import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { CardNewComponent } from '../card-new/card-new.component';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { Project } from '../../models/project';
import { Column } from '../../models/column';
import { User } from '../../models/user';
import { Task } from '../../models/task';

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

  constructor(private authService: AuthService,
              private apiService: ApiService,
              private modalService: BsModalService) {
    this.organization = 1;
  }

  ngOnInit(): void {
    this.authService.user.subscribe((data: User) => {
      this.user = data;
    });
    this.apiService.getUsers().subscribe((response) => {
      this.users = response.results;
      this.apiService.getProjects(this.organization).subscribe((data) => {
        this.projects = data;
        this.selectProject(data[0]);
      });
    });
  }

  selectProject(project: Project): void {
    this.projectSelected = project;
    if (!project.columns) {
      this.apiService.getChats(project.id).subscribe((chats) => {
        project.chats = chats.reverse();
      });
      this.apiService.getTasks(project.id).subscribe((tasks) => {
        project.tasks = tasks;
      });
      this.apiService.getColumns(project.id).subscribe((columns) => {
        project.columns = columns;
        for (const column of columns) {
          this.apiService.getCards(column.id).subscribe((cards) => {
            column.cards = cards;
          });
        }
      });
    }
  }

  getUser(id: number): User {
    return this.users.filter((user: User) => user.id === id)[0];
  }

  addCard(column: Column): void {
    this.modalService.show(CardNewComponent, {
      class: 'modal-dialog-centered',
      initialState: {
        users: this.users,
        column,
      },
    });
  }

  sidePanelSubmit(): void {
    if (this.sidePanelTab === 'chats') {
      this.addChat(this.sidePanelInput);
    } else if (this.sidePanelTab === 'tasks') {
      this.addTask(this.sidePanelInput);
    }
    this.sidePanelInput = '';
  }

  addChat(content: string): void {
    this.apiService.createChat({
      content,
      project: this.projectSelected.id,
    }).subscribe((chat) => {
      chat.user = this.user.id;
      this.projectSelected.chats.push(chat);
    });
  }

  addTask(content: string): void {
    this.apiService.createTask({
      content,
      project: this.projectSelected.id,
    }).subscribe((task) => {
      this.projectSelected.tasks.unshift(task);
    });
  }

  taskToggle(task: Task) {
    this.apiService.updateTask(task.id, {
      checked: task.checked,
    }).subscribe();
  }
}
