import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, RouterLink],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  orders: any[] = [];
  constructor(private apiservice: ApiService, private router: Router) { }
  ngOnInit(): void {
    // Obtener todos los productos
    this.apiservice.order().subscribe({

      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error('Error al obtener productos:', err)
    });

  }


  verDetalles(orderId: number) {
    // Lógica para ver detalles del pedido
    this.router.navigate(['/detalles-pedido', orderId]);

  }
}
