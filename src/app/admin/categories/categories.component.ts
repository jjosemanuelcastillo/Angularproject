import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { categoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  name: string = '';

  constructor(private serviceCategory: AdminUsersService, public router: Router) { }

  agregarCategoria() {
    const data = {
      name: this.name,
    };
    this.serviceCategory.addCategory(data).subscribe({
      next: (res) => {
        console.log('Producto agregado:', res);
        // Aquí puedes agregar lógica adicional, como redirigir a otra página
        this.router.navigate(['/admin/addProduct']);
      },
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }


}
