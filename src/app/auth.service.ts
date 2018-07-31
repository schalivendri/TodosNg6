import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "/user/register" //"http://localhost:3000/user/register"
  private _loginUrl = "/user/login" //"http://localhost:3000/user/login"

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post(this._loginUrl, user)
  }

  isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  onLogout() {
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
}
