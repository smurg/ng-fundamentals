import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: [`
    .green { color: #003300 !important; }
    .bold { font-weight: bold; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
    .thumbnail { min-height: 250px; }
  `]
})
export class EventThumbnailComponent {
    @Input() event: IEvent;
    /* we need to tell angular to expect a value to be passed in to the component.
    Input decorator: tells angular that property will be passed in from another component */

    @Output() clicked = new EventEmitter();
    /* the eventEmitter can send just one parameter. To send more we need to put everything inside an object */

    handleClickMe() {
      this.clicked.emit(this.event.name);
    }

    getStartTimeClass() {
      const isEarlyStart = this.event && this.event.time === '8:00 am';
      return {green: isEarlyStart, bold: isEarlyStart};
      /* another way! return a string:
        if( this.event && this.event.time === '8:00 am') {
          return 'green bold';
        }
        return '';
      */
    }

}
