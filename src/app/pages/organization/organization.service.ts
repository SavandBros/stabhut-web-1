import { Injectable } from '@angular/core';
import { ApiResponse } from '@app/interfaces/api-response';
import { Label } from '@app/interfaces/label';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { User } from '@app/interfaces/user';
import { ApiService } from '@app/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {

  private static organizationSubject: BehaviorSubject<Organization> = new BehaviorSubject<Organization>(null);
  private static projectsSubject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(null);
  private static labelsSubject: BehaviorSubject<Label[]> = new BehaviorSubject<Label[]>(null);
  private static usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  static organization: Observable<Organization> = OrganizationService.organizationSubject.asObservable();
  static projects: Observable<Project[]> = OrganizationService.projectsSubject.asObservable();
  static labels: Observable<Label[]> = OrganizationService.labelsSubject.asObservable();
  static users: Observable<User[]> = OrganizationService.usersSubject.asObservable();

  constructor(private api: ApiService) {
  }

  static get currentOrganization(): Organization {
    return OrganizationService.organizationSubject.getValue();
  }

  static set currentOrganization(value: Organization) {
    OrganizationService.projectsSubject.next(null);
    OrganizationService.labelsSubject.next(null);
    OrganizationService.usersSubject.next(null);
    OrganizationService.organizationSubject.next(value);
  }

  /**
   * @returns Whether all organization data have been initialised (loaded)
   */
  static get isInitialised(): boolean {
    return Boolean(
      OrganizationService.usersSubject.value &&
      OrganizationService.labelsSubject.value &&
      OrganizationService.projectsSubject.value,
    );
  }

  /**
   * Initialise or refresh organization data (users, labels and projects)
   */
  initialise(): void {
    this.api.getProjects(OrganizationService.currentOrganization.id).subscribe((data: Project[]): void => {
      OrganizationService.projectsSubject.next(data);
    });
    this.api.getLabels(OrganizationService.currentOrganization.id).subscribe((data: Label[]): void => {
      OrganizationService.labelsSubject.next(data);
    });
    this.api.getUsers().subscribe((data: ApiResponse<User>): void => {
      OrganizationService.usersSubject.next(data.results);
    });
  }
}
