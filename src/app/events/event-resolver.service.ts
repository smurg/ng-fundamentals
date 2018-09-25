import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from './shared/events.service';

@Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService) { }
  resolve(route: ActivatedRouteSnapshot) {
    /*
    Here we will tipically make an async call, like an AJAX call and then when we return,
    we return that data as an OBSERVABLE.
    */
    return this.eventService.getEvent(route.params['id']);
    // pipe(map(events => events));
  }
}
