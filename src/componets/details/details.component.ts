import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../Module/iproduct';
import { FetchProductsService } from '../../services/proucts.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';
import { ReviewsService } from '../../services/reviews.service';
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-details',
  imports: [CommonModule, ɵInternalFormsSharedModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  images: string[] = [];
  productId!: string;
  productDetails!: any;
  quantity: number = 1;
  constructor(
    private productService: FetchProductsService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private review :ReviewsService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get("id")!;
    this.productService.getAllProductImages(this.productId).subscribe({
      next: (res: any) => {
        this.images = res.map((img: any) => img.image);
      }
    });
    this.productService.getProductDetails(this.productId).subscribe({
      next: (res: any) => {
        this.productDetails = res;
        console.log(res)
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
  getFullStars(rating: number) {
  return Array(Math.floor(rating)).fill(0);
}

getHalfStar(rating: number) {
  return rating % 1 !== 0;
}

getEmptyStars(rating: number) {
  return Array(5 - Math.ceil(rating)).fill(0);
}

  decreaseQty() {
    if (this.quantity > 1) this.quantity--;
  }
  increaseQty() {
    this.quantity++;
  }
  addToCart() {
    this.cartService.addToCart(this.productDetails.id, this.quantity).subscribe({
      next: (res) => {
        Swal.fire('Added!', 'Product added to cart successfully.', 'success');
      },
      error: (err) => {
        if (err.status === 401) {
          Swal.fire('Error', 'Please Login First', 'error');
        }
      }
    });
  }

}
