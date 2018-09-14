import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { E404Component } from './errors/e404.component';

import { EventRouteActivatorService } from './events/shared/event-route-activator.service';
import { EventListResolver } from './events/events-list-resolver.service';
import { Routes } from '@angular/router';

/* Routes has all the types and methods to create Route objects */

export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver} },
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService] },
  { path: '404', component: E404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];
/*
it's an array of Route objects:
if the url match '/events' show the component EventsListComponent

canActivate: allows us to determine wheater or not a user can navigate to a route (for example logged-in users)
canDeactivate: to prevent a user from leaving a page. It's useful if you want to warn a user if they try
               to navigate away from a page before saving data.
resolve: Its an object. Before resolving this route, call this EventListResolver and when that resolver
        finishes and returned some data, add this data to the route as a property named EVENTS.
 */
