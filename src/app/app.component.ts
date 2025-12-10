import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { NgFor, NgIf, NgClass, AsyncPipe } from '@angular/common'; // 👈 necesarios para *ngFor y *ngIf
import { TitleCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AdminComponent } from "./admin/admin.component";
import { RouterModule } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLinkWithHref, AsyncPipe, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})


export class AppComponent implements OnInit {

  userCount: number | null = null;
  role: string | null = null;
  nombre: string | null = null;
  email: string | null = null;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {


    this.role = localStorage.getItem('role');
    console.log(this.role)
    // Escuchar cambios de ruta
    this.router.events.subscribe(() => {
      // Esto fuerza a Angular a reevaluar el template
    });

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.nombre = user.name;
      this.email = user.email;
    }

  }


  isAdmin(): boolean {
    return this.role === 'admin';

  }

  isOnAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  goAdmin() {
    this.router.navigate(['/admin']);
  }

  goUser() {
    this.router.navigate(['/Inicio']);
  }



  logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  this.nombre = null;
  this.email = null;
  this.router.navigate(['/Login']);
}


  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

}
