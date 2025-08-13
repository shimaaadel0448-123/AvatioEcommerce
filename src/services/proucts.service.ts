import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iproduct } from '../Module/iproduct';
@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {
  baseUrl: string = '/products/api/products';
  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get<{ data: Iproduct[] }>(this.baseUrl);
  }

}
