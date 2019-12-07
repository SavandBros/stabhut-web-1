import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Column } from '@app/interfaces/column';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  /**
   * Current organization data
   */
  organization: Organization;

  /**
   * Projects of organization
   */
  projects: Project[];

  /**
   * Selected project
   */
  projectSelected: Project;

  /**
   * Selected project tab template variable ('columns' or 'options')
   */
  projectTab = 'columns';

  constructor(private route: ActivatedRoute,
              private api: ApiService) {
  }

  ngOnInit(): void {
    // Get current project ID from router params
    this.route.params.subscribe((params: Params): void => {
      // Load organisation data
      this.api.getOrganization(params.id).subscribe(organization => {
        this.organization = organization;
      });
      // Load projects of organization
      this.api.getProjects(params.id).subscribe(projects => {
        this.projects = projects;
        this.projectSelected = this.projects[0];
        // Load columns of organization
        this.api.getColumns(params.id).subscribe(columns => {
          // Assign columns to their projects
          for (const project of this.projects) {
            project.columns = columns.filter(column => column.project === project.id);
          }
        });
      });
    });
  }

  /**
   * Add a project
   *
   * @param name Project name
   */
  addProject(name: string) {
    this.api.createProject(this.organization.id, name).subscribe(data => {
      data.columns = [];
      this.projects.push(data);
    });
  }

  /**
   * Add a column
   *
   * @param name Column name
   */
  addColumn(name: string): void {
    this.api.createColumn(this.projectSelected.id, name).subscribe(data => {
      this.projectSelected.columns.push(data);
    });
  }

  /**
   * Delete a column
   *
   * @param column Column to delete
   */
  deleteColumn(column: Column): void {
    if (!confirm('Are you sure you want to delete this column?')) {
      return;
    }
    this.api.deleteColumn(column.id).subscribe(() => {
      const index = this.projectSelected.columns.indexOf(column);
      this.projectSelected.columns.splice(index, 1);
    });
  }

  /**
   * Update all columns
   */
  updateColumns() {
    for (let column of this.projectSelected.columns) {
      this.api.updateColumn(column.id, { name: column.name }).subscribe(data => {
        column = data;
      });
    }
  }
}
