import { Component, OnInit, Input } from '@angular/core';
import { ISession } from '../shared/event.model';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
  // styleUrls: ['./session.component.css']
})
export class SessionListComponent implements OnInit {
  @Input() sessions: ISession[];  /* we tell angular to expect a value to be passed in to the component.
    Input decorator: tells angular that property will be passed in from another component */
  constructor() { }

  ngOnInit(): void { }
}
