import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/events.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../shared/event.model';
/*
Activated route
The route path and parameters are available through an injected router service called the ActivatedRoute.
*/
@Component({
  selector: 'event-details',
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding: 0 20px; }
    .event-image { height: 100px; }
  `]
})
export class EventDetailsComponent implements OnInit {
  /* this page is going to be navigated to directly and
  we are going to fetch the property event from the url

  URL: events/:event_id
  When this page is loaded we will get the event from the service */
  event: IEvent;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    /* Why use route.snapshot?
    Snapshot: the no-observable alternative
    This application won't re-use the EventDetailComponent. The user always returns to the event list
    to select another event to view. There's no way to navigate from one event detail to another event detail
    without visiting the list component in between.
    Therefore, the router creates a new EventDetailComponent instance every time.

  Snapshot:
    When you know for certain that a EventDetailComponent instance will never, never, ever be re-used,
    you can simplify the code with the snapshot.
    The route.snapshot provides the initial value of the route parameter map.
    You can access the parameters directly without subscribing or adding observable operators.
    It's much simpler to write and read.
    */
  }
}
