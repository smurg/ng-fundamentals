import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { IEvent, ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
/* Always it's important to mark Services as Injectable! when we are going to use other services like Http

REMEMber to add it as a provider in the module it will be used! */
@Injectable()
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]> {
    /*
    const subject = new Subject<IEvent[]>();
    setTimeout(() => {
      subject.next(EVENTS);
      subject.complete();
    }, 1000); // simulate async

     Subject is an observable from rxjs.
      Observables: are like streams of data. They are kind of arrays where the data arrives over time.
    */
    return this.http.get<IEvent[]>('api/events')
      .pipe(catchError(this.handleError<IEvent[]>('getEvents', []))); // it returns an observable
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>('api/events/' + id)
    .pipe(catchError(this.handleError<IEvent>('getEvent')));
  }

  saveEvent(event) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<IEvent>('/api/events', event, options)
      .pipe(catchError(this.handleError<IEvent>('saveEvent')));
  }

  searchSessions(searchTerm: string): Observable<ISession[]> {

    return this.http.get<ISession[]>('api/sessions/search?search=' + searchTerm)
    .pipe(catchError(this.handleError<ISession[]>('searchSessions')));
    /***************************
    EVENTS.forEach(event => {
      let matchingSessions = event.sessions.filter(
        session => session.name.toLocaleLowerCase().indexOf(term) > -1
      ); // filter all sessions that contains inside the name the term we are searching
      matchingSessions = matchingSessions.map((session: any) => {
        session.eventId = event.id; // we are adding this attr to know from which event corresponds
        return session;
      });
      results = results.concat(matchingSessions);
    });

    const subject = new Subject<ISession[]>();
    setTimeout(() => {
      subject.next(results);
      subject.complete();
    }, 500); // simulate async
    return subject;
    ********************************/
  }

  // T is a generic type
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
