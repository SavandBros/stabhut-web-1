import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiPayloadGet } from '../../interfaces/api-payload-get.interface';
import { ApiPayload } from '../../interfaces/api-payload.interface';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { Card } from '../../models/card';
import { Chat } from '../../models/chat';
import { Column } from '../../models/column';
import { Organization } from '../../models/organization';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Base API endpoint
   */
  static readonly base: string = environment.api;

  constructor(private http: HttpClient) {
  }

  /**
   * Organization list
   * Will get authenticated users organizations.
   */
  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(ApiService.base + 'organizations/').pipe();
  }

  /**
   * Organization detail
   *
   * @param id Organization ID
   */
  getOrganization(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${ApiService.base}organizations/${id}/`).pipe();
  }

  /**
   * Project list of an organization
   *
   * @param organization Organization ID
   */
  getProjects(organization: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${ApiService.base}projects/`, {
      params: {
        organization: organization.toString()
      }
    }).pipe();
  }

  /**
   * Get a column data
   *
   * @param column Column ID
   */
  getColumn(column: number): Observable<Column> {
    return this.http.get<Column>(`${ApiService.base}columns/${column}/`).pipe();
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
    return this.http.get<Column[]>(ApiService.base + 'columns/', { params }).pipe();
  }

  /**
   * Create a column
   *
   * @param project Project ID of the column
   * @param name Column name
   */
  createColumn(project: number, name: string): Observable<Column> {
    return this.http.post<Column>(`${ApiService.base}columns/`, { project, name }).pipe();
  }

  /**
   * Update a column
   *
   * @param id Column ID
   * @param payload Column data to update to
   */
  updateColumn(id: number, payload: ApiPayload): Observable<Column> {
    return this.http.patch<Column>(`${ApiService.base}columns/${id}/`, payload).pipe();
  }

  /**
   * Delete a column
   *
   * @param column Column ID
   */
  deleteColumn(column: number): Observable<void> {
    return this.http.delete<void>(`${ApiService.base}columns/${column}/`).pipe();
  }

  /**
   * Get a card data
   *
   * @param card Card ID
   */
  getCard(card: number): Observable<Card> {
    return this.http.get<Card>(`${ApiService.base}cards/${card}/`).pipe();
  }

  /**
   * Cards of a column
   *
   * @param column Column ID
   */
  getCards(column?: number): Observable<Card[]> {
    return this.http.get<Card[]>(ApiService.base + 'cards/', {
      params: {
        column: column.toString()
      }
    }).pipe();
  }

  /**
   * Update a card
   *
   * @param card Card ID to update
   * @param payload Task data
   */
  updateCard(card: number, payload: ApiPayload): Observable<Card> {
    return this.http.patch<Card>(`${ApiService.base}cards/${card}/`, payload).pipe();
  }

  /**
   * Create a card
   *
   * @param payload Card payload
   */
  createCard(payload: ApiPayload): Observable<Card> {
    return this.http.post<Card>(ApiService.base + 'cards/', payload).pipe();
  }

  /**
   * User detail
   *
   * @param user User ID
   */
  getUser(user: number): Observable<User> {
    return this.http.get<User>(`${ApiService.base}users/${user}/`).pipe();
  }

  /**
   * User list
   */
  getUsers(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(ApiService.base + 'users/').pipe();
  }

  /**
   * Chat list of a project
   *
   * @param project Project ID
   */
  getChats(project: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(ApiService.base + 'chats/', {
      params: {
        project: project.toString(),
      }
    }).pipe();
  }

  /**
   * Create a chat
   *
   * @param payload Chat data
   */
  createChat(payload: ApiPayload): Observable<Chat> {
    return this.http.post<Chat>(ApiService.base + 'chats/', payload).pipe();
  }

  /**
   * Task list of a project
   *
   * @param project Project ID
   */
  getTasks(project: number): Observable<Task[]> {
    return this.http.get<Task[]>(ApiService.base + 'tasks/', {
      params: {
        project: project.toString(),
      }
    }).pipe();
  }

  /**
   * Update a task
   *
   * @param task Task ID to update
   * @param payload Task data
   */
  updateTask(task: number, payload: ApiPayload): Observable<Task> {
    return this.http.patch<Task>(`${ApiService.base}tasks/${task}/`, payload).pipe();
  }

  /**
   * Create a task
   *
   * @param payload Task data
   */
  createTask(payload: ApiPayload): Observable<Task> {
    return this.http.post<Task>(ApiService.base + 'tasks/', payload).pipe();
  }
}
