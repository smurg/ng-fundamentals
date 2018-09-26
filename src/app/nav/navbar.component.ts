import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession } from '../events/shared/event.model';
import { EventService } from '../events/shared/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent {
  searchTerm = '';
  foundSessions: ISession[];

  constructor(private authService: AuthService, private eventService: EventService, private router: Router) { }

  searchSessions(searchTerm): void {
    this.eventService.searchSessions(searchTerm).subscribe( sessions => {
      this.foundSessions = sessions;
    });
  }

  logout(e) {
    this.authService.logout()
      .subscribe(() => {
        this.router.navigate(['/user/login']);
      });
  }
}
