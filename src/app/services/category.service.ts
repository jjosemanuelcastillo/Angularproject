import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class categoryService {

  private apiUrl = 'https://laravelproject-production-87cc.up.railway.app/api';
  constructor(private http: HttpClient, private router: Router) { }

  categories(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.apiUrl}/categorias`);
  }


  getCategoryProducts(id: number): Observable<any[]> {
    return this.http.get<any>(`https://laravelproject-production-87cc.up.railway.app/api/categoria/${id}/products`)
      .pipe(
        map(data => {
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.data)) return data.data;
          return [];
        })
      );
  }

  productByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/${id}/productsByCategory`);
  }



}
