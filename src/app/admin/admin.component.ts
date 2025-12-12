import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(public authService: AuthService) { } //hace que sea visible el  servicio authService.ts
  /*Varibales para este archivo*/
  role: string | null = null;
  nombre: string | null = null;
  email: string | null = null;
  ngOnInit() {

    //Si el usuario que a iniciado sesión es admin entonces muestra la parte de admin en vez de usuario.
    if (!this.isAdmin()) {

      this.role = localStorage.getItem('role');
    }

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

  //Guarda el rol comoadmin y lo retorna para el html
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // redirige o haz logout real si quieres
  }

}
