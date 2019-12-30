import { Label } from '@app/interfaces/label';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { User } from '@app/interfaces/user';
import { OrganizationService } from '@app/pages/organization/organization.service';

export class OrganizationBase {

  organization: Organization;
  projects: Project[];
  labels: Project[];
  users: User[];

  constructor() {
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
}
