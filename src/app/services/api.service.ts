import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LabelKind } from '@app/enums/label-kind.enum';

import { ApiPayload } from '@app/interfaces/api-payload';
import { ApiPayloadGet } from '@app/interfaces/api-payload-get';
import { ApiResponse } from '@app/interfaces/api-response';
import { Card } from '@app/interfaces/card';
import { Chat } from '@app/interfaces/chat';
import { Column } from '@app/interfaces/column';
import { Label } from '@app/interfaces/label';
import { LabelObjectCreated } from '@app/interfaces/label-object-created';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { Task } from '@app/interfaces/task';
import { User } from '@app/interfaces/user';
import { environment } from '@environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /**
   * Base API endpoint
   */
  static readonly BASE: string = environment.api;

  constructor(private http: HttpClient) {
  }

  /**
   * Organization list
   * Will get authenticated users organizations.
   */
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(`${ApiService.BASE}organization/`).pipe();
  }

  /**
   * Organization detail
   *
   * @param id Organization ID
   */
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${ApiService.BASE}organization/${id}/`).pipe();
  }

  /**
   * Create an organization
   *
   * @param name Organization name
   */
  createOrganization(name: string): Observable<Organization> {
    return this.http.post<Organization>(`${ApiService.BASE}organization/`, { name });
  }

  /**
   * Project list of an organization
   *
   * @param organization Organization ID
   */
  getProjects(organization: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${ApiService.BASE}project/`, {
      params: {
        organization: organization.toString(),
      },
    });
  }

  /**
   * Create a project
   *
   * @param organization Organization ID of the project
   * @param name Project name
   */
  createProject(organization: number, name: string): Observable<Project> {
    return this.http.post<Project>(`${ApiService.BASE}project/`, { organization, name });
  }

  /**
   * Get a column data
   *
   * @param column Column ID
   */
  getColumn(column: number): Observable<Column> {
    return this.http.get<Column>(`${ApiService.BASE}column/${column}/`).pipe();
  }

  /**
   * Column list of a project
   *
   * @param organization Organization ID
   * @param project Project ID
   */
  getColumns(organization?: number, project?: number): Observable<Column[]> {
    const params: ApiPayloadGet = {};
    if (organization) {
      params.organization = organization.toString();
    }
    if (project) {
      params.project = project.toString();
    }
    return this.http.get<Column[]>(`${ApiService.BASE}column/`, { params });
  }

  /**
   * Create a column
   *
   * @param project Project ID of the column
   * @param name Column name
   */
  createColumn(project: number, name: string): Observable<Column> {
    return this.http.post<Column>(`${ApiService.BASE}column/`, { project, name });
  }

  /**
   * Update a column
   *
   * @param id Column ID
   * @param payload Column data to update to
   */
  updateColumn(id: number, payload: ApiPayload): Observable<Column> {
    return this.http.patch<Column>(`${ApiService.BASE}column/${id}/`, payload).pipe();
  }

  /**
   * Delete a column
   *
   * @param column Column ID
   */
  deleteColumn(column: number): Observable<void> {
    return this.http.delete<void>(`${ApiService.BASE}column/${column}/`).pipe();
  }

  /**
   * Get a card data
   *
   * @param card Card ID
   */
  getCard(card: number): Observable<Card> {
    return this.http.get<Card>(`${ApiService.BASE}card/${card}/`).pipe();
  }

  /**
   * Delete a card
   *
   * @param card Card ID
   */
  deleteCard(card: number): Observable<void> {
    return this.http.delete<void>(`${ApiService.BASE}card/${card}/`).pipe();
  }

  /**
   * Cards of a column
   *
   * @param column Column ID
   */
  getCards(column?: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${ApiService.BASE}card/`, {
      params: {
        column: column.toString(),
      },
    });
  }

  /**
   * Update a card
   *
   * @param card Card ID to update
   * @param payload Task data
   */
  updateCard(card: number, payload: ApiPayload): Observable<Card> {
    return this.http.patch<Card>(`${ApiService.BASE}card/${card}/`, payload).pipe();
  }

  /**
   * Create a card
   *
   * @param payload Card payload
   */
  createCard(payload: ApiPayload): Observable<Card> {
    return this.http.post<Card>(`${ApiService.BASE}card/`, payload).pipe();
  }

  /**
   * Get current organization's labels
   *
   * @param organization Organization ID
   */
  getLabels(organization: number): Observable<Label[]> {
    const httpParams: HttpParams = new HttpParams().set('organization', String(organization));
    return this.http.get<Label[]>(`${ApiService.BASE}label/`, { params: httpParams });
  }

  /**
   * Create a label
   *
   * @param organization Organization ID of the label
   * @param name Label name
   * @param color Label color
   */
  createLabel(organization: number, name: string, color: string = '#eeeeee'): Observable<Label> {
    return this.http.post<Label>(`${ApiService.BASE}label/`, { organization, name, color });
  }

  /**
   * Assign a label
   *
   * @param kind Label kind
   * @param to ID to assign label to
   * @param labelId Label ID
   */
  assignLabel(kind: LabelKind, to: number, labelId: number): Observable<LabelObjectCreated> {
    return this.http.post<LabelObjectCreated>(`${ApiService.BASE}label-object/`, { kind, to, label: labelId });
  }

  /**
   * De attach a label
   *
   * @param id Label ID
   */
  deAttachLabel(id: number): Observable<void> {
    return this.http.delete<void>(`${ApiService.BASE}label-object/${id}/`);
  }

  /**
   * Update a label
   *
   * @param id Label ID
   * @param payload Label data to update to
   */
  updateLabel(id: number, payload: ApiPayload): Observable<Label> {
    return this.http.patch<Label>(`${ApiService.BASE}label/${id}/`, payload);
  }

  /**
   * Delete a label
   *
   * @param label Label ID
   */
  deleteLabel(label: number): Observable<void> {
    return this.http.delete<void>(`${ApiService.BASE}label/${label}/`);
  }

  /**
   * User detail
   *
   * @param user User ID
   */
  getUser(user: number): Observable<User> {
    return this.http.get<User>(`${ApiService.BASE}user/${user}/`).pipe();
  }

  /**
   * User list
   */
  getUsers(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${ApiService.BASE}user/`).pipe();
  }

  /**
   * Chat list of a project
   *
   * @param project Project ID
   */
  getChats(project: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${ApiService.BASE}chat/`, {
      params: {
        project: project.toString(),
      },
    });
  }

  /**
   * Create a chat
   *
   * @param payload Chat data
   */
  createChat(payload: ApiPayload): Observable<Chat> {
    return this.http.post<Chat>(`${ApiService.BASE}chat/`, payload).pipe();
  }

  /**
   * Task list of a project
   *
   * @param project Project ID
   */
  getTasks(project: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${ApiService.BASE}task/`, {
      params: {
        project: project.toString(),
      },
    });
  }

  /**
   * Update a task
   *
   * @param task Task ID to update
   * @param payload Task data
   */
  updateTask(task: number, payload: ApiPayload): Observable<Task> {
    return this.http.patch<Task>(`${ApiService.BASE}task/${task}/`, payload).pipe();
  }

  /**
   * Create a task
   *
   * @param payload Task data
   */
  createTask(payload: ApiPayload): Observable<Task> {
    return this.http.post<Task>(`${ApiService.BASE}task/`, payload).pipe();
  }
}
