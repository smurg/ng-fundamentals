import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/event.model';
@Component({
  selector: 'session-create',
  templateUrl: './create-session.component.html'
})
export class CreateSessionComponent implements OnInit {
  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  constructor() { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required,
                                        Validators.maxLength(400),
                                        this.restrictedWords(['foo', 'bar'])
                                        ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }
  /* this is a custom validator that receives a list of words that are invalid. We use pure js functions
  to return a closure function that will have access to the array of restricted words. */
  private restrictedWords(words) {
    return (control: FormControl): {[key: string]: any} => {
      if (!words) { return null; }
      const invalidWords = words
        .map(w => control.value.includes(w) ? w : null)  // here we create an array with all the restricted words inside formControl or null
        .filter(w => w !== null);

      return invalidWords && invalidWords.length > 0
        ? {'restrictionWords': invalidWords.join(', ')}
        : null;
    };
  }

  saveSession(formValues) {
    /* let's do a sanity check about the values we receive */
    const session: ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    };
    // send this object to backend to save it
  }
}
