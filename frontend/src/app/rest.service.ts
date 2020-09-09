import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Reserva } from './Models/reserva';
import { Utilizador } from './Models/utilizador';
import { Ementa } from './Models/ementa'
const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
const httpOptionsFile = {
  headers: new HttpHeaders({

    'Accept': 'application/json'
  })
};
const httpOptionsGetFile = {
  headers: new HttpHeaders({
    responseType: 'blob'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
 y
  getUtilizadores(): Observable<any> {
    return this.http.get<any>(endpoint + "utilizador")
  }

  getUtilizador(id: String): Observable<any> {
    return this.http.get<any>(endpoint + "utilizador/" + id);
  }

  updateUtilizador(id: String, nome: String, email: String): Observable<any> {
    return this.http.put<any>(endpoint + "utilizador/" + id, httpOptions);
  }

  deleteUtilizador(id: String): Observable<any> {
    return this.http.delete<any>(endpoint + "utilizador/" + id);
  }

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(endpoint + "reserva")
  }

  getReserva(id: String): Observable<any> {
    return this.http.get<any>(endpoint + "reserva/" + id);
  }

  editarReserva(id: String, reserva: Reserva): Observable<any> {
    return this.http.put<any>(endpoint + "reserva/" + id, JSON.stringify(reserva), httpOptions);
  }

  deleteReserva(id: String): Observable<any> {
    return this.http.delete<any>(endpoint + "reserva/" + id);
  }
  addReserva(reserva: Reserva): Observable<any> {
    return this.http.post<any>(endpoint + "reserva/", JSON.stringify(reserva), httpOptions);
  }

  getAdmins(): Observable<any> {
    return this.http.get<any>(endpoint + "admin");
  }
  getAdmin(id: string): Observable<any> {
    return this.http.get<any>(endpoint + "admin/" + id);
  }
  removeAdmin(id: string): Observable<any> {
    return this.http.delete<any>(endpoint + "admin/" + id);
  }
  addAdmin(id: string): Observable<any> {
    return this.http.post<any>(endpoint + "admin/" + id, {}, {});
  }


  criarEmenta(ementa: Ementa): Observable<any> {
    return this.http.post<any>(endpoint + "ementas/", JSON.stringify(ementa), httpOptions);
  }
  verEmentas(): Observable<any> {
    return this.http.get<any>(endpoint + "ementas/");
  }
  verEmenta(id: string): Observable<any> {
    return this.http.get<any>(endpoint + "ementas/" + id);
  }
  updateEmenta(id: String, ementa: any): Observable<any> {
    return this.http.put<any>(endpoint + "ementas/" + id, JSON.stringify(ementa), httpOptions);
  }

  deleteEmenta(id: String): Observable<any> {
    return this.http.delete<any>(endpoint + "ementas/" + id);
  }
}
