import { Component,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class HeroComponent {

}
