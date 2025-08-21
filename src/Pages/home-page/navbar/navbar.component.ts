import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class NavbarComponent implements OnInit {
  currenTheme: string = 'light';
  isLoggedIn!: boolean;
  cartItems: any[] = []
  constructor(private cartService: CartService,
    private auth: AuthService,
    private router: Router) { }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const savedTheme = localStorage.getItem('theme');
      this.setTheme(savedTheme || 'light');
    }

    this.auth.isLoggedIn$.subscribe(
      status => {
        this.isLoggedIn = status;
      }
    )
  }

  toggleTheme() {
    this.currenTheme = this.currenTheme == 'light' ? 'dark' : 'light';
    this.setTheme(this.currenTheme);
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currenTheme = theme;
    localStorage.setItem('theme', theme);
  }
  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    this.auth.notLogged();

    this.router.navigate(['/login'])
  }
}
