import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*
  ROOT APP COMPONENT
*/
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.checkAuthenticationStatus();
  }

}
