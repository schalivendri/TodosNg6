import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserDetails = {}
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserDetails)
      .subscribe(
        res => {
          localStorage.setItem('token', res['token'])
          this._router.navigate(['/todos'])
          console.log(res) 

        },
        err => console.log(err)
      )
  }
}
