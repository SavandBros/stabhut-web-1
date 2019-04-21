import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../interfaces/api-response.interface';
import { ApiPayload } from '../../interfaces/api-payload.interface';
import { environment } from '../../../environments/environment';
import { Organization } from '../../models/organization';
import { Project } from '../../models/project';
import { Column } from '../../models/column';
import { Card } from '../../models/card';
import { User } from '../../models/user';
import { Chat } from '../../models/chat';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static readonly baseApi: string = environment.api;

  constructor(private http: HttpClient) {
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(ApiService.baseApi + 'organizations/').pipe();
  }

  getProjects(organization?: number): Observable<Project[]> {
    return this.http.get<Project[]>(ApiService.baseApi + 'projects/', {
      params: {
        organization: organization.toString()
      }
    }).pipe();
  }

  getColumns(project?: number): Observable<Column[]> {
    return this.http.get<Column[]>(ApiService.baseApi + 'columns/', {
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
    return this.http.get<Card>(`${ApiService.baseApi}cards/${card}`).pipe();
  }

  getCards(column?: number): Observable<Card[]> {
    return this.http.get<Card[]>(ApiService.baseApi + 'cards/', {
      params: {
        column: column.toString()
      }
    }).pipe();
  }

  createCard(payload: ApiPayload): Observable<Card> {
    return this.http.post<Card>(ApiService.baseApi + 'cards/', payload).pipe();
  }

  /**
   * Get a user data
   *
   * @param user User ID
   */
  getUser(user: number): Observable<User> {
    return this.http.get<User>(`${ApiService.baseApi}users/${user}`).pipe();
  }

  getUsers(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(ApiService.baseApi + 'users/').pipe();
  }

  getChats(project: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(ApiService.baseApi + 'chats/', {
      params: {
        column: project.toString()
      }
    }).pipe();
  }

  createChat(payload: ApiPayload): Observable<Chat> {
    return this.http.post<Chat>(ApiService.baseApi + 'chats/', payload).pipe();
  }

  getTasks(project: number): Observable<Task[]> {
    return this.http.get<Task[]>(ApiService.baseApi + 'tasks/', {
      params: {
        column: project.toString()
      }
    }).pipe();
  }

  updateTask(task: number, payload: ApiPayload): Observable<Task> {
    return this.http.patch<Task>(`${ApiService.baseApi}tasks/${task}/`, payload).pipe();
  }

  createTask(payload: ApiPayload): Observable<Task> {
    return this.http.post<Task>(ApiService.baseApi + 'tasks/', payload).pipe();
  }
}
