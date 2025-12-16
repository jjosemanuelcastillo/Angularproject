import { Component } from '@angular/core';
import { AdminUsersService } from '../../services/admin-users.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  name: string = '';
  description: string = '';
  price: number = 0;
  stock: number = 0;
  id_categoria: number | null = null;
  id_supplier: number | null = null;

  categories: any[] = [];
  suppliers: any[] = [];

  constructor(private serviceProduct: AdminUsersService, public router: Router) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProveedores();
  }

  //metodo de agregar  un producto
  agregarProducto() {
    const data = {
      name: this.name,
      description: this.description,
      price: this.price,
      stock_quantity: this.stock,
      id_categoria: this.id_categoria,
      id_supplier: this.id_supplier
    };

    //Petición a la API para añadir el producto
    this.serviceProduct.addProduct(data).subscribe({
      next: (res) => {
        console.log('Producto agregado:', res);
        this.router.navigate(['/admin/products']);
      },
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }

  //Metodo para cargar las categorias
  cargarCategorias() {
    this.serviceProduct.getCategories().subscribe({
      next: (res: any) => this.categories = res,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  //Metodo para cargar los proveedores
  cargarProveedores(){
    this.serviceProduct.suppliers().subscribe({
      next: (res: any) => this.suppliers = res,
      error: (err) => console.error('Error al cargar los proveedores: ', err)
    });
  }
}
