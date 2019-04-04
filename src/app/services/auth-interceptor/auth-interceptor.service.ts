import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  /**
   * Add authorization header with JWT token if available
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string | null = AuthService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'JWT ' + token,
        }
      });
    }
    return next.handle(request).pipe(catchError(this.error));
  }

  /**
   * 401: Sign out and reload
   */
  error(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.authService.signOut();
    }
    return throwError(error.error.message || error.statusText);
  }
}
