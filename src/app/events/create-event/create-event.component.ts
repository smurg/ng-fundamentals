import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../shared/events.service';

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html'
})
export class CreateEventComponent implements OnInit {
  isDirty = true;

  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit() {
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    }); // if we don't subscribe the observer function never executes!
  }

}
