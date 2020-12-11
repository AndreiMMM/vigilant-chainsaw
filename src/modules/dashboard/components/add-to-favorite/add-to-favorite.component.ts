import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactInterface } from '../../models/contactInterface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.scss'],
})
export class AddToFavoriteComponent implements OnInit {
  public contactsFormControl = new FormControl();
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: ContactInterface[],
    private readonly dialogRef: MatDialogRef<AddToFavoriteComponent>
  ) {}

  public ngOnInit(): void {}

  public save(): void {
    this.dialogRef.close(this.contactsFormControl.value);
  }
}
