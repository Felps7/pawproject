import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    observe : 'response'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', JSON.stringify({
      username, password
    }), httpOptions);
  }
  logout() : Observable<any> {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    return this.http.post<any>('http://localhost:3000/api/logout', {});
  }
  register(nome: string, username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/utilizador', JSON.stringify({
      nome,
      username,
      email,
      password,
    }),httpOptions);
  }
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/changePassword', JSON.stringify({
      currentPassword,
      newPassword
    }),httpOptions)
  }
}
