import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function spaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length && control.value.trim().length === 0) {
      return { containsOnlySpace: true };
    } else {
      return null;
    }
  };
}
