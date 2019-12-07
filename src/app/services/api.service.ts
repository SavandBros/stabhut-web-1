import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiPayload } from '@app/interfaces/api-payload';
import { ApiPayloadGet } from '@app/interfaces/api-payload-get';
import { ApiResponse } from '@app/interfaces/api-response';
import { Card } from '@app/interfaces/card';
import { Chat } from '@app/interfaces/chat';
import { Column } from '@app/interfaces/column';
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
    return this.http.get<Organization[]>(ApiService.BASE + 'organizations/').pipe();
  }

  /**
   * Organization detail
   *
   * @param id Organization ID
   */
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${ApiService.BASE}organizations/${id}/`).pipe();
  }

  /**
   * Project list of an organization
   *
   * @param organization Organization ID
   */
  getProjects(organization: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${ApiService.BASE}projects/`, {
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
    return this.http.post<Project>(`${ApiService.BASE}projects/`, { organization, name });
  }

  /**
   * Get a column data
   *
   * @param column Column ID
   */
  getColumn(column: number): Observable<Column> {
    return this.http.get<Column>(`${ApiService.BASE}columns/${column}/`).pipe();
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
    return this.http.get<Column[]>(ApiService.BASE + 'columns/', { params });
  }

  /**
   * Create a column
   *
   * @param project Project ID of the column
   * @param name Column name
   */
  createColumn(project: number, name: string): Observable<Column> {
    return this.http.post<Column>(`${ApiService.BASE}columns/`, { project, name });
  }

  /**
   * Update a column
   *
   * @param id Column ID
   * @param payload Column data to update to
   */
  updateColumn(id: number, payload: ApiPayload): Observable<Column> {
    return this.http.patch<Column>(`${ApiService.BASE}columns/${id}/`, payload).pipe();
  }

  /**
   * Delete a column
   *
   * @param column Column ID
   */
  deleteColumn(column: number): Observable<void> {
    return this.http.delete<void>(`${ApiService.BASE}columns/${column}/`).pipe();
  }

  /**
   * Get a card data
   *
   * @param card Card ID
   */
  getCard(card: number): Observable<Card> {
    return this.http.get<Card>(`${ApiService.BASE}cards/${card}/`).pipe();
  }

  /**
   * Cards of a column
   *
   * @param column Column ID
   */
  getCards(column?: number): Observable<Card[]> {
    return this.http.get<Card[]>(ApiService.BASE + 'cards/', {
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
    return this.http.patch<Card>(`${ApiService.BASE}cards/${card}/`, payload).pipe();
  }

  /**
   * Create a card
   *
   * @param payload Card payload
   */
  createCard(payload: ApiPayload): Observable<Card> {
    return this.http.post<Card>(ApiService.BASE + 'cards/', payload).pipe();
  }

  /**
   * User detail
   *
   * @param user User ID
   */
  getUser(user: number): Observable<User> {
    return this.http.get<User>(`${ApiService.BASE}users/${user}/`).pipe();
  }

  /**
   * User list
   */
  getUsers(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(ApiService.BASE + 'users/').pipe();
  }

  /**
   * Chat list of a project
   *
   * @param project Project ID
   */
  getChats(project: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(ApiService.BASE + 'chats/', {
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
    return this.http.post<Chat>(ApiService.BASE + 'chats/', payload).pipe();
  }

  /**
   * Task list of a project
   *
   * @param project Project ID
   */
  getTasks(project: number): Observable<Task[]> {
    return this.http.get<Task[]>(ApiService.BASE + 'tasks/', {
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
    return this.http.patch<Task>(`${ApiService.BASE}tasks/${task}/`, payload).pipe();
  }

  /**
   * Create a task
   *
   * @param payload Task data
   */
  createTask(payload: ApiPayload): Observable<Task> {
    return this.http.post<Task>(ApiService.BASE + 'tasks/', payload).pipe();
  }
}
