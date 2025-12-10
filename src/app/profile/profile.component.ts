import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  //constructor que ccrea una variable del servicio AuthService.ts
  //varibale router es para poder navegar aqui
  constructor(public authService: AuthService, private router: Router) { }

  /*
  Variables
  */
  nombre: string | null = null;
  email: string | null = null;

  //metodo para cerrar sesión
  logout() {
    //Aqui se llama el metodo logout() del servicio
    this.authService.logout().subscribe({
      //Aqui se recibe lo que devuelve la API
      next: (res) => {

        //Eliminar el token, el nombre y el email del localstorage
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email')

        //navegar a la página login
        this.router.navigate(['/Login']);
      },

      //mostrar error
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
        localStorage.removeItem('name')

        this.router.navigate(['/Login']);
      }
    });
  }


  ngOnInit() {
    //constante que guarda valor user del localStorage(los valores del usuario)
    const userData = localStorage.getItem('user');

    //Si la costante no esta vacia  se parsea el json para guardarlo en otra costante
    if (userData) {
      const user = JSON.parse(userData);
      this.nombre = user.name;
      this.email = user.email;
      console.log('Nombre guardado en localStorage:', this.nombre);
      console.log('Email guardado en localStorage:', this.email);
    } else {
      console.warn('No hay datos de usuario guardados.');
      this.router.navigate(['/Login']);
    }
  }

  goOrder() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/Login']);
    } else {
      this.router.navigate(['/pedidos']);
    }
  }

}
