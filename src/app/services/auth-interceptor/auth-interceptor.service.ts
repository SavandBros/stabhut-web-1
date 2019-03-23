import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  /**
   * 401: Sign out and reload
   */
  static catchAuthError(error: HttpErrorResponse) {
    if (error.status === 401) {
      AuthService.signOut();
      location.href = '/';
    }
    return throwError(error.error.message || error.statusText);
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
    return next.handle(request).pipe(catchError(AuthInterceptorService.catchAuthError));
  }
}
