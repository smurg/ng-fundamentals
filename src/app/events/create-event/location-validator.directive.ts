import { Directive } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appValidateLocation]'
})
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
