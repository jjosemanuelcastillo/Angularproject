import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { categoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent {

  //variables
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  menuOpen = false;

  constructor(
    private apiService: ApiService,
    private categorySercvice: categoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    //Petición a la APi para recoger todos los productos
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data; // mostrar todos al inicio
      },
      error: (err) => console.error(err)
    });
    //Peticion para recoger las categorías
    this.categorySercvice.categories().subscribe({
      next: (data) => this.categories = Array.isArray(data) ? data : [],
      error: (err) => console.error(err)
    });

    //Recoger el valor id  para el filtro de productos por categoría
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) this.cargarProductosPorCategoria(id);
    });
  }

  //Metodo que realiza la petición a la API para recoger los productos por categoría
  cargarProductosPorCategoria(id: number) {
    this.categorySercvice.getCategoryProducts(id).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => console.error(err)
    });
  }

  //Metodo que hace que se abra el menu hamburguesa
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  //Navega a la ruta
  filtrarPorCategoria(id: number) {
    this.router.navigate(['/category', id, 'products']);
  }

  //Metodo que navega a los detalles del producto
  verProducto(id: number) {
    this.router.navigate(['/products', id]);
  }

  //Metodo que filtra la busqueda
  Busqueda() {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
