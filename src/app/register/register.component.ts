import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserDetails = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  error: string
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    if (!this.registerUserDetails.email) {
      this.error = 'Email is required'
    } else if (!this.registerUserDetails.password) {
      this.error = 'Password is required'
    } else if (!this.registerUserDetails.confirmPassword) {
      this.error = 'Confirm Password is required'
    } else if (this.registerUserDetails.password !== this.registerUserDetails.confirmPassword) {
      this.error = 'Confirm Password doesn\'t match'
    } else {
      this._auth.registerUser(this.registerUserDetails)
        .subscribe(
          res => {
            console.log(res)
            localStorage.setItem('token', res['token'])
            this._router.navigate(['/todos'])
          },
          err => {
            console.log(err)
            this.error = err.error
          }
        )
    }
  }

}
