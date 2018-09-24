import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventService } from './events/shared/events.service';
import { EventRouteActivatorService } from './events/shared/event-route-activator.service';
import { EventListResolver } from './events/events-list-resolver.service';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { JQ_TOKEN } from './common/jquery.service';

import { AppComponent } from './app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { NavBarComponent } from './nav/navbar.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { E404Component } from './errors/e404.component';
import { CreateSessionComponent } from './events/event-details/create-session.component';
// we can use barrel files to reduce the import lines: https://medium.com/@adrianfaciu/barrel-files-to-use-or-not-to-use-75521cd18e65
import { SessionListComponent } from './events/event-details/session-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { DurationPipe } from './events/shared/duration.pipe';
import { UpvoteComponent } from './events/event-details/upvote.component';
import { VoterService } from './events/event-details/voter.service';
import { LocationValidator } from './events/create-event/location-validator.directive';

const jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateSessionComponent,
    CreateEventComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    UpvoteComponent,
    DurationPipe,
    LocationValidator,
    E404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventService,
    EventRouteActivatorService,
    EventListResolver,
    AuthService,
    VoterService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    }
  ],
  bootstrap: [AppComponent]
})
/*
we have to register all of our components within the modules
declarations: when you wanna add a COMPONENT, PIPE or DIRECTIVE we must declare it inside that array.
            First importing it and then adding it to the array, like AppComponent.
            If the component is not declared there, you will have an error when using it!!!!

imports:    Used to import other modules. BrowserModule will give access to a lot of built in angular features.

Providers:  is to declare the services that this module will use.
            - We can also define functions as providers. For example to check when activate/deactivate routes
            - PROVIDERS ARE SHARED BETWEEN ALL MODULES.

bootstrap:  declares which component will be the initial to load.
*/
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  // the first parameter this function(canDeactivate) receives is the component loaded on that route!
  if (component.isDirty) {
    // we can display a modal to show a confirmation message
    return window.confirm('you have not saved this event, do you really want to cancel?');
  }
  return true;
}
