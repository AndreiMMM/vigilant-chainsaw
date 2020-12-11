import { EntityState } from '@ngrx/entity';
import { ContactInterface } from './contactInterface';

export interface DashboardStateInterface extends EntityState<ContactInterface> {
  loading: boolean;
  loaded: boolean;
  next?: string;
  error?: boolean;
}
