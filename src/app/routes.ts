import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { E404Component } from './errors/e404.component';

import { EventListResolver } from './events/events-list-resolver.service';
import { Routes } from '@angular/router';
import { CreateSessionComponent } from './events/event-details/create-session.component';
import { EventResolver } from './events/event-resolver.service';

/* Routes has all the types and methods to create Route objects */

export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events: EventListResolver} },
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
  { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver} },
  { path: 'events/session/new', component: CreateSessionComponent },
  { path: '404', component: E404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: './user/user.module#UserModule' }
];
/*
it's an array of Route objects:
if the url match '/events' show the component EventsListComponent

canActivate: allows us to determine wheater or not a user can navigate to a route (for example logged-in users)
canDeactivate: to prevent a user from leaving a page. It's useful if you want to warn a user if they try
               to navigate away from a page before saving data.
resolve: Its an object. Before resolving this route, call this EventListResolver and when that resolver
        finishes and returned some data, add this data to the route as a property named EVENTS.
loadChildren: to load a child module (with bunch of components/routes inside) and use lazy loading.

Lazy Loading - loadChildren property:
If we have a multi-modular application, implementing a lazy loading feature is recommended.
The great advantage of a lazy loading approach is that we can load our resources on demand and
not all at once. This helps us in decreasing the startup time.
 */
