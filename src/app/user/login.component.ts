import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styles: [`
        em { float: right; color: #E05C65; padding-left: 10px; }
    `]
})
export class LoginComponent implements OnInit {
  userName;
  password;
  loginInvalid = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login(formValues) {
    this.loginInvalid = false;
    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe(response => {
        if (!response) {
          // error, display some message
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
