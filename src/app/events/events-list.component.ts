import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/events.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html'
}) /* templateUrl declares the url of the html file with the UI of the component. The url is relative to the component.*/
export class EventsListComponent implements OnInit {
  events: IEvent[];
  /* the private syntax is saying eventService will ve a private property for this component */
  constructor(private eventService: EventService, private route: ActivatedRoute) {
  /*  this.events = this.eventService.getEvents();
        it's not a good idea to put this on the constructor if we do an ajax call that takes time! */
  }

  ngOnInit() {
    /*
     now getEvents() returns an observable object that will receive data over time.
     we need to subscribe to it in order to do what we want when the data is received.
     But we do all now inside a Resolver!!!

        this.eventService.getEvents().subscribe(events => {this.events = events; });
     */
    this.events = this.route.snapshot.data['events']; // this events parameter came from the resolver on the route.
  }

  handleClick(val) {
    console.log(`received ${val}`);
  }
}
