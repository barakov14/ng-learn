import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[ttNoReact]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NoReactValidator),
      multi: true,
    },
  ],
})
export class NoReactValidator implements Validator {
  registerOnValidatorChange(fn: () => void): void {}

  validate(control: AbstractControl): ValidationErrors | null {
    return (control.value?.toLowerCase() ?? '') === 'react'
      ? { noReact: { message: 'Никаких реактов!' } }
      : null;
  }
}
