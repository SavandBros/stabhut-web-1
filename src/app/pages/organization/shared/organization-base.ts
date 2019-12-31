import { OnInit } from '@angular/core';
import { Label } from '@app/interfaces/label';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { User } from '@app/interfaces/user';
import { OrganizationService } from '@app/pages/organization/organization.service';

export class OrganizationBase implements OnInit {

  organization: Organization;
  projects: Project[];
  labels: Label[];
  users: User[];

  ngOnInit(): void {
    OrganizationService.organization.subscribe((data: Organization): void => {
      this.organization = data;
    });
    OrganizationService.projects.subscribe((data: Project[]): void => {
      this.projects = data;
    });
    OrganizationService.labels.subscribe((data: Label[]): void => {
      this.labels = data;
    });
    OrganizationService.users.subscribe((data: User[]): void => {
      this.users = data;
    });
  }

  getProject(id: number): Project {
    if (this.projects) {
      return this.projects.find(item => item.id === id);
    }
  }

  getLabel(id: number): Label {
    if (this.labels) {
      return this.labels.find(item => item.id === id);
    }
  }

  getUser(username: string): User {
    if (this.users) {
      return this.users.find(item => item.username === username);
    }
  }
}
