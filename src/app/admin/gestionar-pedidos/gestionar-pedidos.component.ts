import { Component } from '@angular/core';
import { AdminUsersService } from '../../services/admin-users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionar-pedidos',
  imports: [FormsModule, CommonModule],
  templateUrl: './gestionar-pedidos.component.html',
  styleUrl: './gestionar-pedidos.component.css'
})
export class GestionarPedidosComponent {
  //pedido
  order: any;
  //nuevo estado
  newStatus: string = '';

  constructor(private adminUsersService: AdminUsersService) { }

  // ngOnInit() {
  //   //cargar detalles del pedido
  //   this.adminUsersService.updateOrderStatus(1, {}).subscribe(response => {
  //     this.order = response.body;
  //   });

  // }

  // updateOrderStatus() {
  //   if (this.newStatus) {
  //     const updateData = { status: this.newStatus };
  //     this.adminUsersService.updateOrderStatus(this.order.id, updateData).subscribe(response => {
  //       console.log('Estado del pedido actualizado:', response.body);
  //       this.order.status = this.newStatus;
  //       this.newStatus = '';
  //     }, error => {
  //       console.error('Error al actualizar el estado del pedido:', error);
  //     });
  //   } else {
  //     console.warn('Por favor, seleccione un nuevo estado antes de actualizar.');
  //   }
  // }

}
