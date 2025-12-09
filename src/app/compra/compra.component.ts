import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra',
  imports: [CommonModule],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css'] // corrijo de styleUrl a styleUrls
})
export class CompraComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.cargarProducto(id);
    });
  }

  cargarProducto(id: number) {
    this.apiService.showProduct(id).subscribe({
      next: (res) => {
        console.log('Producto cargado:', res);
        this.product = res; // asegúrate de que aquí res tiene la info correcta
      },
      error: (err) => console.error('Error al cargar producto:', err)
    });
  }

  realizarCompra() {
    if (!this.product) return;

    this.apiService.purchaseProduct(this.product.id, 1).subscribe({
      next: (res) => {
        console.log('Compra realizada con éxito:', res);
        this.router.navigate(['/pedidos']); // redirige después de la compra
      },
      error: (err) => {
        console.error('Error al realizar la compra:', err);
        alert('No se pudo realizar la compra, inténtalo de nuevo.');
      }
    });
  }
}
