import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  message = ''; // mensaje de estado
  notification = '';
  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.user).subscribe({
      next: (res: any) => { //le decimos que es tipo any
        this.notification = 'Usuario registrado correctamente';
        localStorage.setItem('token', res.token); // guardar token
        this.authService.setAuthenticated(true, this.user.name, this.user.email);

        this.message = 'Inicio de sesión correcto ✅';
        // Aquí podrías guardar token o redirigir al dashboard
        this.router.navigate(['Login']);
      },
      error: (err: any) => { //también le ponemos tipo any
        console.error('Error al registrar:', err);
        alert('Error al registrar: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  }


}
