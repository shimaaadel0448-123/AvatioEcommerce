import { Routes } from '@angular/router';
import { SignUpComponent } from '../componets/sign-up/sign-up.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { LoginComponent } from '../componets/login/login.component';
import { CartDetailsComponent } from '../Pages/home-page/cart-details/cart-details.component';
import { BrandsComponent } from '../Pages/home-page/brands/brands.component';

export const routes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'details', component: CartDetailsComponent },
  { path: 'brand', component: BrandsComponent },
  { path: '', component: HomePageComponent },
];
