import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
})

/*
  This will be a reactive form: It's better to do validations with js
*/

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const firstName = new FormControl(this.authService.currentUser.firstName,
                          Validators.required); // we can pass an array of validators
    const lastName = new FormControl(this.authService.currentUser.lastName,
                          Validators.required);
    // but which html element they correspond to?
    // we set formControlName into component HTML
    this.profileForm = new FormGroup({
      firstName,
      lastName
    });
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe((data) => {
          console.log(data);
          // show confirmation message with Toaster or something like that.
          this.router.navigate(['events']);
        });
    }
  }

  cancel() {
    this.router.navigate(['events']);
  }
}
