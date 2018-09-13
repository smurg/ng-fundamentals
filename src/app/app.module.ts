import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { NavBarComponent } from './nav/navbar.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { E404Component } from './errors/e404.component';

import { EventService } from './events/shared/events.service';
import { EventRouteActivatorService } from './events/shared/event-route-activator.service';
import { appRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    E404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventService, EventRouteActivatorService],
  bootstrap: [AppComponent]
})
/*
we have to register all of our components within the modules
declarations: when you wanna add a component, pipe or directive we must declare it inside that array.
            First importing it and then adding it to the array, like AppComponent.
            If the component is not declared there, you will have an error when using it!!!!

imports:    Used to import other modules. BrowserModule will give access to a lot of built in angular features.

Providers:  is to declare the services that this module will use.

bootstrap:  declares which component will be the initial to load.
*/
export class AppModule { }
