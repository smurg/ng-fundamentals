import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/events.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) { }
  resolve() {
    /*
    Here we will tipically make an async call, like an AJAX call and then when we return,
    we return that data as an OBSERVABLE.
    If we use subscribe => we return a subscription not an OBSERVABLE.
    we need to use pipe, to do the processing when data is received and also return an Observable
    */
    return this.eventService.getEvents();
    // pipe(map(events => events));
  }
}
