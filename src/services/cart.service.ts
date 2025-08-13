import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../Module/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = '/cart/api/cart-items/';

  constructor(private http: HttpClient) { }

  addToCart(productId: number, quantity: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`
      }
    )
    const body = {
      productId,
      quantity,
      size: null,
      color: null
    };
    return this.http.post(this.apiUrl, body, { headers });
  }
  getAllCartItems(): Observable<Iproduct[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
  deleteCartItem(productId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }
editCartItem(productId: number, updateData: { quantity: number }): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.patch(`${this.apiUrl}${productId}/`, updateData, { headers });
}

}
