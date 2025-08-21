import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Iproduct } from "../Module/iproduct";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  baseUrl: string = '/products/api/reviews';

  constructor(private http: HttpClient) { }

/*  addToFav(productId: string): Observable<Iproduct> {

  }*/
 

}
