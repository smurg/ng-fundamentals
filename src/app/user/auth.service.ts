import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, password: string) {
    // our server will use passport to authenticate the user
    // call the server and do the login/authentication
    const loginInfo =  { username: userName, password: password },
      options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    // beware of the attr naming conventions (camelCase, lowercase, etc) the API need to receive
    return this.http.post('api/login', loginInfo, options)
      .pipe(tap(data => {
         // the tap method of RxJS lets us see the value that comes through and take an action
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(err => {
        /* in case of error we wanna notify the user (maybe a misspelled username/password)
        in order to do that, we are going to change the value in the Observable stream to a false value
        */
        return of(false); // create an Observable of False if there is an error
      }));
  }

  isAuthenticated() {
    return !!this.currentUser;
    // cast to boolean and return false if there isn't any current user
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        // if the user is not authenticated, the server won't return the user Object
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }))
      .subscribe(); // if we dont want to do anything with the data that come from server, we call subscribe here.
  }

  updateCurrentUser(firstName: string, lastName: string) {
    // POST /api/users/:user_id
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;
    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    // we could make this as a PUT or a GET, but for testing purpose it will be a POST with {} object
    return this.http.post('/api/logout', {}, options);
  }
}
