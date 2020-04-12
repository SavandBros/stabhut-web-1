import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Column } from '@app/interfaces/column';
import { Label } from '@app/interfaces/label';
import { Milestone } from '@app/interfaces/milestone';
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
   * Labels of organization
   */
  labels: Label[];

  /**
   * Milestones of project
   */
  milestones: Milestone[];

  /**
   * Selected project
   */
  projectSelected: Project;

  /**
   * Selected label
   */
  labelSelected: Label;

  /**
   * Selected project tab template variable ('columns' or 'milestones' or 'options')
   */
  projectTab = 'columns';

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router) {
  }

  ngOnInit(): void {
    // Get current project ID from router params
    this.route.params.subscribe((params: Params): void => {
      // Load organisation data
      this.api.getOrganization(params.id).subscribe(organization => {
        this.organization = organization;
      });
      // Load labels of organization
      this.api.getLabels(params.id).subscribe((labels: Label[]): void => {
        this.labels = labels;
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
        this.getMilestones();
      });
    });
  }

  /**
   *  Load milestones of projects
   */
  getMilestones(): void {
    this.api.getMilestones(this.projectSelected.id).subscribe(milestone => {
      this.milestones = milestone;
    });
  }
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
   * Update a project
   */
  updateProject(): void {
    let project: Project;
    this.api.updateProject(this.projectSelected.id, {
      name: this.projectSelected.name,
      organization: this.organization.id,
    }).subscribe(data => {
      project = data;
    });
  }

  /**
   * Delete a Project
   *
   */
  deleteProject(): void {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    this.api.deleteProject(this.projectSelected.id).subscribe(() => {
      const index = this.projects.indexOf(this.projectSelected);
      this.projects.splice(index, 1);
      this.projectSelected = this.projects[0];
    });
  }

  /**
   * Add a label
   *
   * @param name Label name
   */
  addLabel(name: string) {
    this.api.createLabel(this.organization.id, name).subscribe((data: Label): void => {
      this.labels.push(data);
    });
  }

  /**
   * Add a column
   *
   * @param name Column name
   */
  addColumn(name: string): void {
    this.api.createColumn({ project: this.projectSelected.id, name }).subscribe(data => {
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
  updateColumns(): void {
    for (let column of this.projectSelected.columns) {
      this.api.updateColumn(column.id, { name: column.name }).subscribe(data => {
        column = data;
      });
    }
  }

  /**
   * Update a label
   *
   * @param label Label to update
   */
  updateLabel(label: Label): void {
    this.api.updateLabel(label.id, { name: label.name, color: label.color }).subscribe((data: Label): void => {
      label = data;
    });
  }

  /**
   * Delete a label
   *
   * @param label Label to delete
   */
  deleteLabel(label: Label): void {
    if (!confirm('Are you sure you want to delete this label?')) {
      return;
    }
    this.api.deleteLabel(label.id).subscribe((): void => {
      const index: number = this.labels.findIndex((item: Label): boolean => item.id === label.id);
      this.labels.splice(index, 1);
      this.labelSelected = null;
    });
  }
}
