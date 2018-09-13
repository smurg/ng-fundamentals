import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { EventService } from './events.service';

@Injectable()
export class EventRouteActivatorService implements CanActivate {
  constructor(private eventService: EventService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const eventExist = !!this.eventService.getEvent(+route.params['id']); // with !! we cast the value to boolean
    if (!eventExist) {
      this.router.navigate(['/404']);
    }
    return eventExist; // it needs to return a boolean!!!!!
  }
}
