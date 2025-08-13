import { BehaviorSubject, Observable } from "rxjs";
import { Iuser } from "../Module/iuser";
import { ISavedUser } from "../Module/i-saved-user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.isLoggedInSubject.next(true);
    }
  }

  register(userData: Iuser): Observable<any> {
    return this.http.post('/accounts/api/register/', userData);
  }

  login(userData: ISavedUser): Observable<any> {
    return this.http.post('accounts/api/login/', userData);
  }

  isLogged() {
    this.isLoggedInSubject.next(true);
  }

  notLogged() {
    this.isLoggedInSubject.next(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}
