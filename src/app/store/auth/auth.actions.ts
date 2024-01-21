import { Action } from '@ngrx/store';
import { User } from '../../models/models';

export enum AuthActionsType {
  create = 'Create auth',
  delete = 'Delete auth',
}

export class AuthCreateAction implements Action {
  readonly type = AuthActionsType.create;
  constructor(public payload: User) {}
}

export class AuthoDeleteAction implements Action {
  readonly type = AuthActionsType.delete;
  constructor(public payload: User) {}
}

export type AuthActions = AuthCreateAction;
