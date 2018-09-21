import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession } from '../events/shared/event.model';
import { EventService } from '../events/shared/events.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {
  searchTerm = '';
  foundSessions: ISession[];

  constructor(private authService: AuthService, private eventService: EventService) { }

  searchSessions(searchTerm): void {
    this.eventService.searchSessions(searchTerm).subscribe( sessions => {
      this.foundSessions = sessions;
    });
  }
}
