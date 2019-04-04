import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Organization } from '../../models/organization';
import { Project } from '../../models/project';
import { Column } from '../../models/column';
import { Card } from '../../models/card';
import { User } from '../../models/user';

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

  getCards(column?: number): Observable<Card[]> {
    return this.http.get<Card[]>(ApiService.baseApi + 'cards/', {
      params: {
        column: column.toString()
      }
    }).pipe();
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(ApiService.baseApi + 'users/' + id).pipe();
  }
}
