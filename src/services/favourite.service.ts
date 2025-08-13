import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) {}

  addToFav(productId: string): Observable<any> {
    const url = `https://mmy2.pythonanywhere.com/products/api/product/${productId}/favorite/`;
    return this.http.post(url, {});
  }
}
