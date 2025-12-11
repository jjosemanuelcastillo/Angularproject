import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Route, Router, RouterLink } from "@angular/router";
import { categoryService } from '../services/category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
  products: any[] = [];
  productByElectronics: any[] = [];
  constructor(private apiService: ApiService, private router: Router,private catService: categoryService) {}

  ngOnInit(): void {

    this.apiService.getBestSellers().subscribe({
      next: (data) => {
        const arr = Array.isArray(data) ? data : [];
        this.products = arr;
      },
      error: (err) => console.error('Error al obtener productos (componente):', err)
    });
    this.catService.productByCategory(7).subscribe({
      next: (data) => {
        const arr = Array.isArray(data) ? data : [];
        this.productByElectronics = arr;
      },
      error: (err) => console.error('Error al obtener productos por categoría (componente):', err)
    });

  }



  // Método para barajar los productos aleatoriamente (defensivo)
  shuffleArray(array: any[]): any[] {
    if (!Array.isArray(array) || array.length === 0) return [];
    return array.sort(() => Math.random() - 0.5);
  }

 verProducto(id: number) {
  this.apiService.showProduct(id).subscribe({
    next: (res) => {
      console.log('Viendo el producto', res);
      // Redirigir a la vista de detalles del producto
      this.router.navigate(['/products', id]); // 👈 esto lleva a /products/ID
    },
    error: (err) => console.error('Error al ver detalles del producto', err)
  });
}




}
