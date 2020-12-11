import { createEntityAdapter } from '@ngrx/entity';
import { ContactInterface } from '../models/contactInterface';

export const dashboardAdapter = createEntityAdapter<ContactInterface>();
