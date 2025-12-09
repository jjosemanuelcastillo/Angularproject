import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';  // importar SEPARADO evita inferencias raras
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/public/api/products';
  private apiUrl2 = 'http://localhost/public/api';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => {
        // si la API devuelve { data: [...] } o directamente [...], adaptamos
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.data)) return data.data;
        return [];
      }),
      catchError(err => {
        console.error('Error en API getProducts:', err);
        return of([]);
      })
    );
  }

  destroyProduct(id: number): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token'); // o donde lo guardes
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<any>(`${this.apiUrl2}/destroyProduct/${id}`, { headers, observe: 'response' });
  }

  showProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/products/${id}`);
  }



  getBestSellers(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl2}/best-sellers`).pipe(
      map(data => {
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.data)) return data.data;
        return [];
      }),
      catchError(err => {
        console.error('Error en API getBestSellers:', err);
        return of([]);
      })
    );
  }

  purchaseProduct(id: number, quantity: number) {
    const body = { quantity };

    // Obtener el token del localStorage
    const token = localStorage.getItem('token'); // o donde guardes el token

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl2}/compra/${id}`, body, { headers });
  }

  order(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl2}/pedidos`, { headers });
  }

  showProductByOrder(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(`${this.apiUrl2}/pedidos/${id}`, { headers });
  }


}
