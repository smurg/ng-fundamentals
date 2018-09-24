import { Directive } from '@angular/core';
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms';
/*

NG_VALIDATORS: it represents the list of every validators angular supports. If we need to use new
              custom validator, we need to add it to that list. It's essentially a service.

When dealing with forms in Angular you can use the build-in validators
like: required, minLength or maxLength, pattern…
Sooner or later you need a custom validator fulfilling a special validation.
You have two ways to add validators to a form control.
- Using imperative approach by specifying them as a parameter to a form control:
  const ctrl = new FormControl('', Validators.required);
- Declaratively by using validator specific directives in the template:
  <input [formControl]='ctrl' required>

The following example registers a custom validator directive.
Adding the validator to the existing collection of validators requires the multi: true option.
*/
@Directive({
  selector: '[appValidateLocation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LocationValidator,
      multi: true
  }]
})
/** :point_up: here we say; this class/service LocationValidator that is a validator,
 * we want to add it to this list of services (NG_VALIDATORS) because we put multi: true
*/
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): { [key: string]: any } {
    const { address: addressControl, city: cityControl, country: countryControl } = formGroup.controls,
      onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']; // formGroup.root will give us the Form
    if ((addressControl && addressControl.value && cityControl && cityControl.value && countryControl && countryControl.value)
      || (onlineUrlControl && onlineUrlControl.value)) {
      return null; // this tells the validation system that there is no validation error
    }
    return { validateLocation: false };
  }
}
