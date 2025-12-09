import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-detalles-pedido',
  imports: [FormsModule, CommonModule],
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {
  detalles: any = {
    products: [] // inicializamos el array para evitar errores de undefined
  };

  constructor(private orderDetails: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    // Por ahora usamos ID=1, luego podemos reemplazarlo por parámetro de ruta
    this.orderDetails.showProductByOrder(orderId).subscribe({
      next: (data) => {
        this.detalles = data;
        console.log('Detalles del pedido:', data);
      },
      error: (err) => {
        console.error('Error al obtener detalles del pedido:', err);
        // Si hay error, inicializamos products para no romper la vista
        this.detalles.products = [];
      }
    });
  }
}
