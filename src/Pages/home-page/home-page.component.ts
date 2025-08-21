import { Component ,ChangeDetectionStrategy} from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { ProsComponent } from './pros/pros.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent,ProsComponent,ReviewsComponent,ProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomePageComponent {

}
