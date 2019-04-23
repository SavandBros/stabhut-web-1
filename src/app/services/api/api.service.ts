import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
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
   * Project list of an organization
   *
   * @param organization Organization ID
   */
  getProjects(organization?: number): Observable<Project[]> {
    return this.http.get<Project[]>(ApiService.base + 'projects/', {
      params: {
        organization: organization.toString()
      }
    }).pipe();
  }

  /**
   * Column list of a project
   *
   * @param project Project ID
   */
  getColumns(project?: number): Observable<Column[]> {
    return this.http.get<Column[]>(ApiService.base + 'columns/', {
      params: {
        project: project.toString()
      }
    }).pipe();
  }

  /**
   * Get a card data
   *
   * @param card Card ID
   */
  getCard(card?: number): Observable<Card> {
    return this.http.get<Card>(`${ApiService.base}cards/${card}`).pipe();
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
    return this.http.get<User>(`${ApiService.base}users/${user}`).pipe();
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
        column: project.toString()
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
        column: project.toString()
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
