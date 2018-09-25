import { Injectable } from '@angular/core';
import { ISession } from '../shared/event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class VoterService {
  constructor(private http: HttpClient) {}

  deleteVoter(eventId: number, session: ISession, voterName: string) {
    session.voters = session.voters.filter(voter => voter !== voterName);
    // filter return a new array with all voters except the one we we are deleting
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http.delete(url)
      .pipe(catchError(this.handleError('removeError')))
      .subscribe();
  }

  addVoter(eventId: number, session: ISession, voterName: string) {
    session.voters.push(voterName); // here we update the client side.
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`,
      options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) }; // always we do a post we need to set the options
    this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe(); // we don't need any notification to the component it will use it.
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some(voter => voter === voterName);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
