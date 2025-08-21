import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iproduct } from '../Module/iproduct';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {
  baseUrl: string = '/products/api/products';
  secondUrl: string = '/products/api/product';

  constructor(private http: HttpClient) { }
  getAllProducts() {
    return this.http.get<{ data: Iproduct[] }>(this.baseUrl);
  }
  getAllProductImages(productId: string) {
    return this.http.get(`${this.secondUrl}/${productId}/images/`)
  }
  getProductDetails(productId: string): Observable<Iproduct> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders(
      {
        'Authorization': `Beares ${token}`
      }
    )
    return this.http.get<Iproduct>(`${this.secondUrl}/${productId}`, { headers })
  }
}
