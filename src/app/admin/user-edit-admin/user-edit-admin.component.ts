import { Component, OnInit } from '@angular/core';
import { AdminUsersService } from '../../services/admin-users.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-edit-admin.component.html',
  styleUrls: ['./user-edit-admin.component.css']
})
export class UserEditAdminComponent implements OnInit {
  orders: any[] = [];
  detalles: any = { products: [] };
  id: number = 0;

  constructor(
    private adminService: AdminUsersService,
    private route: ActivatedRoute,
    private orderDetails: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      this.loadOrders();
    });
  }

  loadOrders() {
    // Cargar todos los pedidos del usuario
    this.adminService.getOrderByUser(this.id).subscribe({
      next: (res) => {
        this.orders = res.body || [];
        console.log('Pedidos cargados:', this.orders);
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.orders = [];
      }
    });
  }

  // Cargar detalles de un pedido específico
  loadOrderDetails(orderId: number) {
    this.orderDetails.showProductByOrder(orderId).subscribe({
      next: (data) => {
        this.detalles = data;
        this.detalles.products = data.products || [];
        console.log('Detalles del pedido:', data);
      },
      error: (err) => {
        console.error('Error al obtener detalles del pedido:', err);
        this.detalles.products = [];
      }
    });
  }

   saveOrder(order: any) {
     this.adminService.updateOrder(order.id, order).subscribe({
       next: (res) => {
         alert('Pedido actualizado correctamente');
          this.loadOrders(); // Recargar la lista de pedidos
       },
       error: (err) => {
         console.error('Error al actualizar pedido:', err);
         alert('Error al actualizar pedido');
       }
     });
   }
}
