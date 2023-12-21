import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthentic$ = new BehaviorSubject(false);

  setIsAuthentic(isActive: boolean) {
    this.isAuthentic$.next(isActive)
  }

  static getToken() {
    let token = localStorage.getItem('token');
    if (token)
      token = JSON.parse(token);
    return token;
  }
}
