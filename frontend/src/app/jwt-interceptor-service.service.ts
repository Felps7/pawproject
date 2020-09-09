import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          "x-access-token": `${currentUser.token}`
        }
      });
    }
    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          localStorage.removeItem("currentUser")
          localStorage.setItem("sessionExpired","true")
          this.router.navigate(['']);
        }
        if(error.status == 403){
          this.router.navigate(['/home']);
        }
        return throwError(error);
    }));
  }
}
