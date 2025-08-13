import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../Module/iproduct';
import { CommonModule } from '@angular/common';
import { FetchProductsService } from '../../../services/proucts.service';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  prodctList: Iproduct[] = [];
  isLoading: boolean = true;
  showModal = false;
  isFav = false
  favourites: Iproduct[] = []
  constructor(private products: FetchProductsService, private cartSercise: CartService) {

  }
  ngOnInit(): void {
    this.products.getAllProducts().subscribe(
      {
        next: (data) => {
          this.prodctList = data.data.slice(4, 8);
          this.isLoading = false
        },
        error: (err) => {
          console.log(err)
          this.isLoading = true
        }
      }
    )
  }

  addToCart(product: Iproduct) {
    let quantity = 1;

    Swal.fire({
      title: 'Choose Quantity',
      html: `<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin:20px 0;">
        <button id="decrease" class="swal2-styled" style="padding:0 10px;">-</button>
        <span id="quantity-value" style="min-width:20px;display:inline-block;">${quantity}</span>
        <button id="increase" class="swal2-styled" style="padding:0 10px;">+</button>
      </div>`,
      showCancelButton: true,
      confirmButtonText: `<i class="fa fa-cart-plus"></i> Add to Cart`,
      didOpen: () => {
        const popup = Swal.getPopup()!;
        const quantityValue = popup.querySelector('#quantity-value') as HTMLElement;
        const decreaseBtn = popup.querySelector('#decrease') as HTMLButtonElement;
        const increaseBtn = popup.querySelector('#increase') as HTMLButtonElement;

        const update = () => quantityValue.textContent = String(quantity);

        decreaseBtn.addEventListener('click', () => {
          if (quantity > 1) { quantity--; update(); }
        });

        increaseBtn.addEventListener('click', () => {
          quantity++; update();
        });
      },
      preConfirm: () => quantity
    }).then((result) => {
      if (result.isConfirmed) {
        const qty = result.value as number;
        this.cartSercise.addToCart(product.id, qty).subscribe({
          next: (res) => {
            console.log(res),
              Swal.fire('Added!', 'Product added to cart successfully.', 'success')
          },
          error: (err) => {
            if (err.status == 401)
              Swal.fire('Error', 'Please Login First', 'error')
          }
        });
      }
    });
  }
}




