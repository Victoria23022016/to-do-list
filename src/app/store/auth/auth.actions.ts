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

export class AuthDeleteAction implements Action {
  readonly type = AuthActionsType.delete;
  constructor() {}
}

export type AuthActions = AuthCreateAction | AuthDeleteAction;
