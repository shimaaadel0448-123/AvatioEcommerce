import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  imports: [],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  quantity = 1
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<number>();
  increase() {
    this.quantity++;
  }
  decrease() {
    if (this.quantity > 1) this.quantity--;
  }
  closeModal() {
    this.close.emit();
  }
  addToCart() {
    this.add.emit(this.quantity);
  }

}
