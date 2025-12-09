import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-producto',
  imports: [CommonModule],
  templateUrl: './detalles-producto.component.html',
  styleUrl: './detalles-producto.component.css'
})
export class DetallesProductoComponent {

  constructor(private route: ActivatedRoute, private apiService: ApiService,    private router: Router,) { }
  product: any;

  ngOnInit() {


    this.route.params.subscribe(params => {
      const id = Number(params['id']); // <— convertir
      this.apiService.showProduct(id).subscribe({
        next: (res) => {
          console.log("Respuesta completa del API:", res);
          this.product = res; // aquí es probable que res.data sea undefined
        },
        error: (err) => console.error('Error al cargar producto:', err)
      });

    });
  }

verCompra(productId: number) {
    console.log("Producto comprado con ID:", productId);
    //redirigir a la página de compra
    if(localStorage.getItem('token') === null){
      this.router.navigate(['/Login']);
    }else{
      this.router.navigate(['/compra', productId]);
    }


  }
}
