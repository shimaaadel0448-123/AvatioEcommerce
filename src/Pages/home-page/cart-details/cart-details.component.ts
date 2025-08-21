import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CartService } from '../../../services/cart.service';
import { Iproduct } from '../../../Module/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  addedProducts!: any[];
  subTotal: number = 0;
  tax: number = 0;
  c: number = 0;
  isLoading: boolean = true;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getAllCartItems().subscribe({
      next: (res: any) => {
        this.addedProducts = res.results;
        console.log(this.addedProducts);

        this.subTotal = this.addedProducts.reduce((sum, product) => sum + product.sub_total, 0);
        this.tax = this.addedProducts.reduce((sum, product) => sum + product.tax_amount, 0);
        this.isLoading = false;

      },
      error: (err) => {
        this.isLoading = false;

        if (err.status === 401) {
          Swal.fire('Error', 'Please Login First', 'error');
        }
      }
    });
  }
  remove(productId: number) {
    console.log('Remove called for id:', productId);

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to remove this item from the cart?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.deleteCartItem(productId).subscribe({
          next: () => {
            this.addedProducts = this.addedProducts.filter(p => p.id != productId);
            this.subTotal = this.addedProducts.reduce((sum, product) => sum + product.sub_total, 0);
            this.tax = this.addedProducts.reduce((sum, product) => sum + product.tax_amount, 0);
            Swal.fire('Deleted!', 'Item has been removed from your cart.', 'success');
          },
          error: (err) => {
            Swal.fire('Error!', 'Failed to remove item.', 'error');
            console.log(err);
          }
        });
      }
    });
  }


}
