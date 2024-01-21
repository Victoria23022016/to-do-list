import { AbstractControl } from '@angular/forms';

export class TodoValidators {
  static minValue(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && control.value.length < 4) {
      {
        return { minValue: true };
      }
    }
    return null;
  }
}
