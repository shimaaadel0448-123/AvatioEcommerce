import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { FooterComponent } from "../Pages/home-page/footer/footer.component";
import { NavbarComponent } from '../Pages/home-page/navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent,NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'avatio';
}
