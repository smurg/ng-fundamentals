import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'error-404',
  template: `
    <h1 class="errorMessage">Page not Found!</h1>
  `,
  styles: [`
    .errorMessage {
        margin-top: 150px;
        font-size: 170px;
        text-align: center;
    }
  `]
})
export class E404Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
}
