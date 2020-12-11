import { InMemoryDbService } from 'angular-in-memory-web-api';
import { contactsDb } from './contactsdb';

export class InMemoryDataService implements InMemoryDbService {
  public static genId(): number {
    return Math.round(Math.random() * 1000000);
  }
  public createDb(): {} {
    const contacts = contactsDb;
    return { contacts };
  }
}
