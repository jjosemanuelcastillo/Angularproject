import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Variables compartidas
  showRegister = false; // alterna entre login y registro
  message = ''; // mensaje de estado

  // Campos de login
  loginEmail = '';
  loginPassword = '';

  // Campos de registro
  regName = '';
  regEmail = '';
  regPassword = '';
  // regPasswordConfirm = '';

  constructor(private authService: AuthService, private router: Router) { }

  // 🔹 Alternar entre login ↔ registro
  toggleView() {
    this.showRegister = !this.showRegister;
    this.message = ''; // limpia mensajes al cambiar vista
  }

  // 🔹 Iniciar sesión
  onLogin() {
    const data = {
      email: this.loginEmail,
      password: this.loginPassword
    };
    this.authService.login(data).subscribe({
      next: (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.user.role);
        this.message = 'Inicio de sesión correcto ✅';
        // Aquí podrías guardar token o redirigir al dashboard
        if(localStorage.getItem('role') === 'admin'){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/Inicio']);
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.message = 'Correo o contraseña incorrecta';
      }
    });


  }


  // 🔹 Registrar usuario



}
