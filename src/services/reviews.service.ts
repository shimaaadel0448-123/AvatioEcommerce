import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Module/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  baseUrl: string = '/products/api/reviews';

  constructor(private http: HttpClient) { }
  getAllReviews(): Observable<Iproduct[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Iproduct[]>(this.baseUrl, { headers })
  }
}
