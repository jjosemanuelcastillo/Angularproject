import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminUsersService } from '../../services/admin-users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(public authService: AuthService, public users: AdminUsersService, private route: Router) { } //hace que sea visible el  servicio authService.ts
  /*Varibales para este archivo*/
  role: string | null = null;
  nombre: string | null = null;
  email: string | null = null;
  adminUsers: any[] = [];

  ngOnInit() {

    //Si el usuario que a iniciado sesión es admin entonces muestra la parte de admin en vez de usuario.
    if (!this.isAdmin()) {

      this.role = localStorage.getItem('role');


    }

    this.users.getUseers().subscribe({
      next: (response) => {
        const arrayUsers = Array.isArray(response) ? response : [];
        this.adminUsers = arrayUsers;
      },
    });
  }

  //Guarda el rol comoadmin y lo retorna para el html
  isAdmin(): boolean {
    return this.role === 'admin';
  }
  editarUsuario(id: number) {

    this.route.navigate(['/admin/users/edit', id]);
  }

  eliminarUsuario(id:number) {
    this.users.deleteUser(id).subscribe({
      next: (response) => {
        console.log('Usuario eliminado:', response);
        // Actualizar la lista de usuarios después de eliminar
        this.adminUsers = this.adminUsers.filter(user => user.id !== id);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // redirige o haz logout real si quieres
  }

}
