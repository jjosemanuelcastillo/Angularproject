import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  private apiUrl = 'https://laravelproject-production-87cc.up.railway.app/api';

  constructor(private http: HttpClient) { }

  getUseers(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/users`, {headers});
  }

  updateProduct(id: number, data: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}/products/${id}`, data, { headers, observe: 'response' });
  }
  addProduct(data: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/addProduct`, data, { headers, observe: 'response' });
  }


  addCategory(data: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/addCategory`, data, {headers, observe: 'response' });
  }

  getCategories(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/categorias`, {headers});
  }

  getOrderByUser(id: number): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.apiUrl}/getOrderByUser/${id}`, { headers, observe: 'response' });
  }

  deleteUser(id: number): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`, { headers });
  }

  updateOrder(id: number, data: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    console.log('Token enviado:', token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}/updateOrder/${id}`, data, { headers, observe: 'response' });
  }
}
