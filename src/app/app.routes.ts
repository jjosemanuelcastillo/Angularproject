import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { DetallesProductoComponent } from './inicio/detalles-producto/detalles-producto.component';
import { ProductsUserComponent } from './products-user/products-user.component';
import { CompraComponent } from './compra/compra.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { UserEditAdminComponent } from './admin/user-edit-admin/user-edit-admin.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HelpComponent } from './help/help.component';
import { EditUserComponent } from './profile/edit-user/edit-user.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'Ayuda', component: HelpComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'Perfil', component: ProfileComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'productos', component: ProductsUserComponent },
  { path: 'products/:id', component: DetallesProductoComponent },
  { path: 'Inicio', component: InicioComponent },
  { path: 'category/:id/products', component: ProductsUserComponent },
  { path: 'compra/:id', component: CompraComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'detalles-pedido/:id', component: DetallesPedidoComponent},
  { path: 'editar/:id', component: EditUserComponent},

  // Rutas para administrador
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'editProduct/:id', component: ProductEditComponent },
      { path: 'addProduct', component: AddProductComponent },
      { path: 'Perfil', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'categoriesManage', component: CategoriesComponent },
      { path: 'users/edit/:id', component: UserEditAdminComponent }
    ]
  },

  // Ruta comodín al final
  { path: '**', component: PageNotFoundComponent },
];

