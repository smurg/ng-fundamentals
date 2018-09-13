import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/events.service';
@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html'
}) /* templateUrl declares the url of the html file with the UI of the component. The url is relative to the component.*/
export class EventsListComponent implements OnInit {
  events: any;
  /* the private syntax is saying eventService will ve a private property for this component */
  constructor(private eventService: EventService) {
  /*  this.events = this.eventService.getEvents();
        it's not a good idea to put this on the constructor if we do an ajax call that takes time! */
  }

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }

  handleClick(val) {
    console.log(`received ${val}`);
  }
}
