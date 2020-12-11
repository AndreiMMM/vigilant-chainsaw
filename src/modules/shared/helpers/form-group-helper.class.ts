import { AbstractControl, FormControl } from '@angular/forms';

export class FormGroupHelperClass {
  public abstractControlToFormControl(
    abstractControl: AbstractControl
  ): FormControl {
    return abstractControl as FormControl;
  }
}
