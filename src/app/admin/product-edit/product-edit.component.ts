import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AdminUsersService } from '../../services/admin-users.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  imports: [FormsModule]
})
export class ProductEditComponent implements OnInit {
  product: any;
  name: string = '';
  description: string = '';
  price: number = 0;
  stock: number = 0;
  category_id: number | null = null;
  supplier_id: number | null = null;

  categories: any[] = [];
  suppliers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private adminUsersService: AdminUsersService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.cargarProducto(id);
    });

    this.cargarCategorias();
    // this.cargarProveedores();
  }

  cargarProducto(id: number) {
    this.apiService.showProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.name = res.name;
        this.description = res.description;
        this.price = res.price;
        this.stock = res.stock_quantity;
        this.category_id = res.category_id;
        this.supplier_id = res.supplier_id;
      },
      error: (err) => console.error('Error al cargar producto:', err)
    });
  }

  cargarCategorias() {
    this.adminUsersService.getCategories().subscribe({
      next: (res: any) => this.categories = res,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  // cargarProveedores() {
  //   this.apiService.getSuppliers().subscribe({
  //     next: (res: any) => this.suppliers = res,
  //     error: (err) => console.error('Error al cargar proveedores:', err)
  //   });
  // }

  guardarProducto() {
    if (!this.product) return;

    const data = {
      name: this.name,
      description: this.description,
      price: this.price,
      stock_quantity: this.stock,
      category_id: this.category_id,
      supplier_id: this.supplier_id
    };

    this.adminUsersService.updateProduct(this.product.id, data).subscribe({
      next: (res) => {
        console.log('Producto actualizado:', res);
        this.router.navigate(['/admin/products']);
      },
      error: (err) => console.error('Error al actualizar producto:', err)
    });
  }
}
