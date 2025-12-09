import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: any[] = [];
  nombre: string | null = null;
  email: string | null = null;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (data) => {
        const arr = Array.isArray(data) ? data : [];
        this.products = arr;
      },
      error: (err) => console.error('Error al obtener productos (componente):', err)
    });

    const userData = localStorage.getItem('user'); //Guardar los datos del usuario

    // si  existe ese usuario prasea el jsson para poder mostrarlo en pantalla
    if (userData) {
      const user = JSON.parse(userData);
      this.nombre = user.name;
      this.email = user.email;
      console.log('Nombre guardado en localStorage:', this.nombre);
      console.log('Email guardado en localStorage:', this.email);
    } else {
      console.warn('No hay datos de usuario guardados.');
    }

  }


  // Método para barajar los productos aleatoriamente (defensivo)
  shuffleArray(array: any[]): any[] {
    if (!Array.isArray(array) || array.length === 0) return [];
    return array.sort(() => Math.random() - 0.5);
  }

  eliminarProducto(id: number) {
    this.apiService.destroyProduct(id).subscribe({
      next: (res) => {
        console.log('Producto eliminado', res);
        this.products = this.products.filter(p => p.id !== id);
      },
      error: (err) => console.error('Error al eliminar producto', err)
    });
  }

  editarProducto(id: number) {
    this.router.navigate(['/admin/editProduct', id]);
  }

  anadirProducto() {
    this.router.navigate(['/admin/addProduct']);
  }

}
