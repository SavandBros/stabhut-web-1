import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { Column } from '../../models/column';
import { ApiService } from '../../services/api/api.service';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { ApiResponse } from '../../interfaces/api-response.interface';

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

  constructor(private api: ApiService) {
    this.organization = 1;
  }

  ngOnInit(): void {
    this.api.getUsers().subscribe((response: ApiResponse<User>) => {
      this.users = response.results;
      this.api.getProjects(this.organization).subscribe((data: Project[]) => {
        this.projects = data;
        this.selectProject(data[0]);
      });
    });
  }

  selectProject(project: Project): void {
    this.projectSelected = project;
    if (!project.columns) {
      this.api.getColumns(project.id).subscribe((columns: Column[]) => {
        project.columns = columns;
        for (const column of columns) {
          this.api.getCards(column.id).subscribe((cards: Card[]) => {
            column.cards = cards;
          });
        }
      });
    }
  }

  getUser(id: number): User {
    return this.users.filter((user: User) => user.id === id)[0];
  }
}
