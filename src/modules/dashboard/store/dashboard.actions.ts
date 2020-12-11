import { Action } from '@ngrx/store';
import { ContactInterface } from '../models/contactInterface';

export enum DashboardActionTypes {
  ADD = '[Contact] Add',
  ADD_SUCCESS = '[Contact] Add success',
  ADD_FAILED = '[Contact] Add failed',
  LOAD_CONTACTS = '[Contact] Load contact',
  LOAD_CONTACTS_SUCCESS = '[Contact] Load contact success',
  LOAD_CONTACTS_FAILED = '[Contact] Load contact failed',
  UPDATE = '[Contact] Update',
  UPDATE_SUCCESS = '[Contact] Update success',
  UPDATE_FAILED = '[Contact] Update failed',
  DELETE = '[Contact] Delete',
  DELETE_SUCCESS = '[Contact] Delete success',
  DELETE_FAILED = '[Contact] Delete failed',
}

export class LoadContacts implements Action {
  public readonly type = DashboardActionTypes.LOAD_CONTACTS;

  constructor() {}
}

export class LoadContactsSuccess implements Action {
  public readonly type = DashboardActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<ContactInterface>) {}
}
export class LoadContactsFailed implements Action {
  public readonly type = DashboardActionTypes.LOAD_CONTACTS_FAILED;

  constructor(public message: string) {}
}

export class Add implements Action {
  public readonly type = DashboardActionTypes.ADD;

  constructor(public contact: ContactInterface) {}
}

export class AddSuccess implements Action {
  public readonly type = DashboardActionTypes.ADD_SUCCESS;

  constructor(public contact: ContactInterface) {}
}
export class AddFailed implements Action {
  public readonly type = DashboardActionTypes.ADD_FAILED;

  constructor(public message: string) {}
}

export class Delete implements Action {
  public readonly type = DashboardActionTypes.DELETE;

  constructor(public id: number) {}
}
export class DeleteSuccess implements Action {
  public readonly type = DashboardActionTypes.DELETE_SUCCESS;

  constructor(public id: number) {}
}
export class DeleteFailed implements Action {
  public readonly type = DashboardActionTypes.DELETE_FAILED;

  constructor(public message: string) {}
}

export class Update implements Action {
  public readonly type = DashboardActionTypes.UPDATE;

  constructor(public contact: ContactInterface) {}
}
export class UpdateSuccess implements Action {
  public readonly type = DashboardActionTypes.UPDATE_SUCCESS;

  constructor(public contact: ContactInterface) {}
}
export class UpdateFailed implements Action {
  public readonly type = DashboardActionTypes.UPDATE_FAILED;

  constructor(public message: string) {}
}

export type DashboardActions =
  | LoadContacts
  | LoadContactsFailed
  | LoadContactsSuccess
  | Add
  | AddSuccess
  | AddFailed
  | Delete
  | DeleteSuccess
  | DeleteFailed
  | Update
  | UpdateSuccess
  | UpdateFailed;
