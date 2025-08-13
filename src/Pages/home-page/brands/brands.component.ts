import { Component, OnInit } from '@angular/core';
import { Ibrand } from '../../../Module/ibrand';
import { BrandService } from '../../../services/brand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {
  brands: Ibrand[] = []
  constructor(private brandService: BrandService) { }
  ngOnInit(): void {
    this.brandService.getAllBrands().subscribe(
      {
        next: (res:any) => {
          console.log(res);
          this.brands = res.results;
        }
      }
    )
  }


}
