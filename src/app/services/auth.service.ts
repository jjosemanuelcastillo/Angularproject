import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://laravelproject-production-87cc.up.railway.app/api/auth';
  private apiUrl2 = 'https://laravelproject-production-87cc.up.railway.app/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userNameSubject = new BehaviorSubject<string>('');
  userName$ = this.userNameSubject.asObservable();
  private userEmailSubject = new BehaviorSubject<string>('');
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticatedSubject.next(!!localStorage.getItem('token')); //convierte a boolean el localstorage(si hay una cadena de texto rellenado es true, si no false).
    const guardarNombbre = localStorage.getItem('name'); //Se guarda el nombre del usuario en una variable
    const guardarEmail = localStorage.getItem('email');
    const guardarToken = localStorage.getItem('token');
    // console.log('token:', guardarToken);
    if (guardarNombbre) { //Si la variable guardarNombbre no es null guarda el nombre en el localstorage en el observable
      this.userNameSubject.next(guardarNombbre);
    }
    if (guardarEmail) {
      this.userEmailSubject.next(guardarEmail);
    }
  }

  /*
  Función para saber si se a autenticado e usuario o no.
  */
  setAuthenticated(value: boolean, userName?: string, userEmail?: string) {
    this.isAuthenticatedSubject.next(value);
    if (userName) {
      localStorage.setItem('name', userName);
      this.userNameSubject.next(userName);
    }
    if (userEmail) {
      localStorage.setItem('email', userEmail);
      this.userEmailSubject.next(userEmail);
    }

  }

  /**
   * funcion que recibe por parametro introducidos y le hace la petición al servidor.
   */
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getUser() {
    const token = localStorage.getItem('token'); // Recupera el token guardado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Aquí va el token
    });
    return this.http.get<any>(`${this.apiUrl2}/me`,{headers});

  }

  /**
   * Lo mismo que login pero con el registro, para crear el usuario
   */
  register(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }
  // Función que envia el token al servidor para atutenticar al usuario en el login.
  logout(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token guardado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // Aquí va el token
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }); // POST vacío con header
  }

  //Función que recupera el valor del servidor de número de usuarios registrados.
  getUserCount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.get(`https://laravelproject-production-87cc.up.railway.app/api/users/count`, { headers });
  }

  updateUser(id: Number,data: any): Observable<HttpResponse<any>> {
    return this.http.put<any>(`${this.apiUrl}/edit/${id}`, data);
  }
}
