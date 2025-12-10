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

  constructor(private authService: AuthService, private router: Router) { } // 👈 en minúscula

  register() {
    this.authService.register(this.user).subscribe({ // 👈 en minúscula también
      next: (res: any) => { // 👈 le decimos que es tipo any (opcional)
        console.log('Registro exitoso', res);
        alert('Usuario registrado correctamente');
        localStorage.setItem('token', res.token); // guardar token si quieres
        this.authService.setAuthenticated(true, this.user.name, this.user.email);
        this.authService.userName$.subscribe(name => {
          console.log('📦 Valor actual de userName$:', name);
        });
        this.message = 'Inicio de sesión correcto ✅';
        // Aquí podrías guardar token o redirigir al dashboard
        this.router.navigate(['Login']);
      },
      error: (err: any) => { // 👈 también le ponemos tipo any
        console.error('Error al registrar:', err);
        alert('Error al registrar: ' + (err.error?.message || 'Error desconocido'));
      }
    });
  }


}
