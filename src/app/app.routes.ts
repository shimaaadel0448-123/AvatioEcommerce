import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () =>
      import('../componets/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../componets/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../Pages/home-page/home-page.component').then(m => m.HomePageComponent)
  },
  {
    path: 'cartDetails',
    loadComponent: () =>
      import('../Pages/home-page/cart-details/cart-details.component').then(m => m.CartDetailsComponent)
  },
  {
    path: 'brand',
    loadComponent: () =>
      import('../Pages/brands/brands.component').then(m => m.BrandsComponent)
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('../componets/details/details.component').then(m => m.DetailsComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
