import {
  Component,
  EventEmitter,
  Inject,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactInterface } from '../../models/contactInterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroupHelperClass } from '../../../shared/helpers/form-group-helper.class';

@Component({
  selector: 'app-contacts-form',
  templateUrl: './contacts-form.component.html',
  styleUrls: ['./contacts-form.component.scss'],
})
export class ContactsFormComponent
  extends FormGroupHelperClass
  implements OnInit, OnChanges {
  public contactsForm: FormGroup;
  public contact: ContactInterface = {} as ContactInterface;
  @Output()
  add: EventEmitter<ContactInterface> = new EventEmitter<ContactInterface>();
  @Output()
  update: EventEmitter<ContactInterface> = new EventEmitter<ContactInterface>();

  public get emailFormControl(): AbstractControl {
    return this.contactsForm.get('email');
  }

  public get nameFormControl(): AbstractControl {
    return this.contactsForm.get('name');
  }

  public get phoneFormControl(): AbstractControl {
    return this.contactsForm.get('phone');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ContactInterface,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<ContactsFormComponent>
  ) {
    super();
  }

  public ngOnInit(): void {
    this.initForm(this.data || this.contact);
  }

  public ngOnChanges(): void {
    this.initForm(this.contact);
  }

  private initForm(contact: Partial<ContactInterface> = {}): void {
    this.contactsForm = this.formBuilder.group({
      name: [contact.name, Validators.required],
      email: [
        contact.email,
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phone: [
        contact.phone,
        [
          Validators.required,
          Validators.pattern(
            '^(\\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\\s|\\.|\\-)?([0-9]{3}(\\s|\\.|\\-|)){2}$'
          ),
        ],
      ],
      id: [contact.id],
      favorite: [contact.favorite],
    });
  }

  public addContact(): void {
    const contact: ContactInterface = { ...this.contactsForm.value };
    this.dialogRef.close(contact);
  }

  public updateContact(): void {
    const contact = {
      ...this.contact,
      ...this.contactsForm.value,
    };
    this.dialogRef.close(contact);
  }
}
