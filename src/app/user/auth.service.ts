import { Injectable } from '@angular/core';
import { IUser } from './user.model';

@Injectable()
export class AuthService {
  currentUser: IUser;

  loginUser(userName: string, password: string) {
    // call the server and do the login/authentication
    this.currentUser = {
      id: 1,
      userName,
      firstName: 'Robert',
      lastName: 'Johnson'
    };
  }

  isAuthenticated() {
    return !!this.currentUser;
    // cast to boolean and return false if there isn't any current user
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }
}
