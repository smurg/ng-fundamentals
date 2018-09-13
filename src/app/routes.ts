import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { E404Component } from './errors/e404.component';

import { EventRouteActivatorService } from './events/shared/event-route-activator.service';
import { Routes } from '@angular/router';
/* Routes has all the types and methods to create Route objects */
export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/new', component: CreateEventComponent },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService] },
  { path: '404', component: E404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];
/* it's an array of Route objects:
if the url match '/events' show the component EventsListComponent

canActivate: allows us to determine wheater or not a user can navigate to a route */
