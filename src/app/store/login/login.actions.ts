import { Action } from '@ngrx/store';
import { User } from '../../models/models';

export enum LoginActionsType {
  create = 'Create login',
}

export class LoginCreateAction implements Action {
  readonly type = LoginActionsType.create;
  constructor(public payload: User) {}
}

export type LoginActions = LoginCreateAction;
