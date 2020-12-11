import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactInterface } from '../../models/contactInterface';
import { PhonePipe } from '../../../shared/pipes/phone-formatter.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { ContactsFormComponent } from '../contacts-form/contacts-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AddToFavoriteComponent } from '../add-to-favorite/add-to-favorite.component';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent implements OnInit {
  @Input() public displayDataSource: ContactInterface[];
  @Input() public fullDataSource: ContactInterface[];

  @Output()
  public deleteEvent: EventEmitter<ContactInterface> = new EventEmitter<ContactInterface>();

  @Output()
  public updateEvent: EventEmitter<ContactInterface> = new EventEmitter<ContactInterface>();

  @Output()
  public addEvent: EventEmitter<ContactInterface> = new EventEmitter<ContactInterface>();

  public displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'favorite',
    'id',
    'menu',
  ];

  public matDataSource: MatTableDataSource<ContactInterface> = new MatTableDataSource();
  public formatPipe: PhonePipe = new PhonePipe();

  private matDefaultConfig = { height: '400px', width: '600px' };

  constructor(public dialog: MatDialog) {}

  public ngOnInit(): void {
    if (!this.fullDataSource) {
      this.fullDataSource = this.displayDataSource;
    }
    this.matDataSource.data = this.displayDataSource;
  }

  public onDelete(contact: ContactInterface): void {
    this.deleteEvent.emit(contact);
  }

  public onUpdate(contact: ContactInterface): void {
    this.updateEvent.emit(contact);
  }

  public favoriteToggle(contact: ContactInterface): void {
    this.onUpdate({
      ...contact,
      favorite: !contact.favorite,
    });
  }

  public setFavorite(contact: ContactInterface, favoriteStatus: boolean): void {
    this.onUpdate({
      ...contact,
      favorite: favoriteStatus,
    });
  }

  public get getDataSource(): MatTableDataSource<ContactInterface> {
    this.matDataSource.data = this.displayDataSource;
    return this.matDataSource;
  }

  public doFilter = (value: string) => {
    this.matDataSource.filter = value.trim().toLocaleLowerCase();
  };

  public openAddPopUp(): void {
    const dialogRef = this.dialog.open(
      ContactsFormComponent,
      this.matDefaultConfig
    );

    dialogRef.afterClosed().subscribe((contact) => {
      if (contact) {
        this.onAdd(contact);
      }
    });
  }

  public openAddToFavoritePopUp(): void {
    const dialogRef = this.dialog.open(AddToFavoriteComponent, {
      ...this.matDefaultConfig,
      data: this.fullDataSource.filter((contact) => {
        return !contact.favorite;
      }),
    });

    dialogRef.afterClosed().subscribe((contactId: number) => {
      if (contactId) {
        const findContactById = this.fullDataSource.find((contact) => {
          return +contact.id === +contactId;
        });
        this.setFavorite(findContactById, true);
      }
    });
  }

  public openUpdatePopUp(selectedContact: ContactInterface): void {
    const dialogRef = this.dialog.open(ContactsFormComponent, {
      ...this.matDefaultConfig,
      data: selectedContact,
    });

    dialogRef.afterClosed().subscribe((contact) => {
      if (contact) {
        this.onUpdate(contact);
      }
    });
  }

  private onAdd(contact: ContactInterface): void {
    this.addEvent.emit(contact);
  }
}
