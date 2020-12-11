import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInterface } from '../models/contactInterface';
import { environment } from '../../../environments/environment';
import { InMemoryDataService } from '../../../fake-backend/fake-backend';

@Injectable({
  providedIn: 'root',
})
export class ContactsApiService {
  constructor(private readonly http: HttpClient) {}

  public getAll(): Observable<ContactInterface[]> {
    return this.http.get<ContactInterface[]>(`${environment.backendUrl}`);
  }

  public delete(id: string): Observable<ContactInterface> {
    return this.http.delete<ContactInterface>(
      `${environment.backendUrl}/${id}`
    );
  }

  public add(contact: ContactInterface): Observable<ContactInterface> {
    contact = {
      ...contact,
      favorite: false,
      id: InMemoryDataService.genId(),
    };

    return this.http.post<ContactInterface>(environment.backendUrl, contact);
  }

  public update(
    contact: Partial<ContactInterface>
  ): Observable<ContactInterface> {
    return this.http.put<ContactInterface>(
      `${environment.backendUrl}`,
      contact
    );
  }
}
