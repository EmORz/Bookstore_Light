import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  currentUser: { email: string; password: string } = null;

  get isLogged() {
    return !!this.currentUser;
  }

  constructor() {
    const currentUser = localStorage.getItem('current-user');
    this.currentUser = currentUser ? JSON.parse(currentUser) : null;
  }

  login(email: string, password: string) {
    localStorage.setItem('current-user', JSON.stringify({ email, password }));
    this.currentUser = { email, password };
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('current-user');
  }
}
