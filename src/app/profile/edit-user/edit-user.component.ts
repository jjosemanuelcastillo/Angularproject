import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';          // Para leer el ID enviado en la URL
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  id!: number;
  name: string = '';
  password: string = '';

  constructor(
    private userService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener ID desde la URL: /edit-user/5
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  update() {
  const data = {
    name: this.name,
    password: this.password
  };

  this.userService.updateUser(this.id, data).subscribe({
    next: (res) => {

      alert('Usuario actualizado');

      // Actualiza el objeto "user" entero
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        user.name = this.name; // Cambiamos el nombre dentro del objeto
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Opcional: actualizar el campo suelto
      localStorage.setItem('name', this.name);

      // Recargar vista
      // location.reload();   // Si quieres que se vea al instante
    },
    error: (err) => console.error(err)
  });
}

}
