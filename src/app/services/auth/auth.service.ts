import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private api: ApiService) {
  }

  /**
   * Save/update token to localStorage
   */
  static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /**
   * @returns Stored token from localStorage
   */
  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Save/update user to localStorage
   */
  static setUser(data: object): void {
    localStorage.setItem('user', JSON.stringify(data));
  }

  /**
   * @returns User data from localStorage
   */
  static getUser(): object | null {
    const data: string = localStorage.getItem('user');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  /**
   * Sign out (clear localStorage)
   */
  static signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Sign in (send API request and save to localStorage)
   */
  signIn(username: string, password: string): Observable<object> {
    return this.http.post(this.api.baseApi + 'auth/', { username, password }).pipe(
      map((data: any) => {
        AuthService.setToken(data.token);
        AuthService.setUser(data.user);
        return data;
      })
    );
  }
}
