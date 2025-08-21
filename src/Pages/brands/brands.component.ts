import { Component, OnInit } from '@angular/core';
import { Ibrand } from '../../Module/ibrand';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands: Ibrand[] = []
  isLoading: boolean = true;

  constructor(private brandService: BrandService, private router: Router) { }
  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.brands = res.results;
          this.isLoading = false;
        },
        error: (err) => {
          if (err.status == 401)
            Swal.fire('Error', 'Please Login First', 'error')
          this.router.navigate(['/login']);

        }
      }

    )
  }


}
