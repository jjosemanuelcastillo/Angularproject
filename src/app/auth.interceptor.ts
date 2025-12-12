import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    // Añadir el token si existe
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        // Detectar token expirado
        if (error.status === 401) {
          console.log('Token expirado. Cerrando sesión.');

          // LIMPIAR localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          localStorage.removeItem('role');
          localStorage.removeItem('id');

          // Redirigir al login
          this.router.navigate(['/Login']);
        }

        return throwError(() => error);
      })
    );
  }
}
