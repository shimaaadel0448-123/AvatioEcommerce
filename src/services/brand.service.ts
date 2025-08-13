import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ibrand } from '../Module/ibrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = '/products/api/brands/'
  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<Ibrand[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders(
      {
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.get<Ibrand[]>(this.apiUrl, { headers })
  }
}
