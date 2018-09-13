import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { Routes } from '@angular/router';
/* Routes has all the types and methods to create Route objects */
export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' }
];
/* it's an array of Route objects:
if the url match '/events' show the component EventsListComponent */
