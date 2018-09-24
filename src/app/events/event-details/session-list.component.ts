import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/event.model';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
  // styleUrls: ['./session.component.css']
})
export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];  /* we tell angular to expect a value to be passed in to the component.
    Input decorator: tells angular that property will be passed in from another component */
  @Input() filterBy: string;
  @Input() sortBy: string;
  filteredSessions: ISession[] = [];

  constructor(private auth: AuthService, private voterService: VoterService) { }

  ngOnChanges() {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.filteredSessions.sort(sortByNameAsc)
                            :  this.filteredSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(session, this.auth.currentUser.userName);
    }
    // as we change votes of sessions we need to update the sorting
    if (this.sortBy === 'votes') {
      this.filteredSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
  }

  filterSessions(filter: string): any {
    if (filter === 'all') {
      this.filteredSessions = this.sessions.slice(0); // clone it! we don't wanna have both arrays linked
    } else {
      this.filteredSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      }); /* filter returns a brand new array with all the filtered sessions */
    }
  }
}

// these are stateless functions, there is no need to be inside the component
function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) {
    return 1;
  } else if (s1.name === s2.name) {
    return 0;
  } else {
    return -1;
  }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
  /**
   * if they both have same number of voters: the remainder will be 0
   * if s2 have more voters:                  the remainder will be positive
   * if s2 have less voters:                  the remainder will be negative
   */
}
