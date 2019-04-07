import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Column } from '../../models/column';
import { ApiService } from '../../services/api/api.service';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { CardNewComponent } from '../card-new/card-new.component';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
   * Selected project
   */
  projectSelected: Project;

  constructor(private apiService: ApiService,
              private modalService: BsModalService) {
    this.organization = 1;
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((response: ApiResponse<User>) => {
      this.users = response.results;
      this.apiService.getProjects(this.organization).subscribe((data: Project[]) => {
        this.projects = data;
        this.selectProject(data[0]);
      });
    });
  }

  selectProject(project: Project): void {
    this.projectSelected = project;
    if (!project.columns) {
      this.apiService.getColumns(project.id).subscribe((columns: Column[]) => {
        project.columns = columns;
        for (const column of columns) {
          this.apiService.getCards(column.id).subscribe((cards: Card[]) => {
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
        cards: column.cards,
        column,
      },
    });
  }
}
