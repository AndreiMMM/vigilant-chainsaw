import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormGroupHelperClass } from '../../../shared/helpers/form-group-helper.class';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent extends FormGroupHelperClass implements OnInit {
  @Input() public formGroup: FormGroup;

  constructor() {
    super();
  }

  public ngOnInit(): void {}

  public get userNameFormControl(): AbstractControl {
    return this.formGroup.get('username');
  }

  public get passwordFormControl(): AbstractControl {
    return this.formGroup.get('password');
  }
}
