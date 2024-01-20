import { Action } from '@ngrx/store';
import { Todo } from 'src/app/models/models';

export enum TodoActionsType {
  create = 'Create todo',
  load = 'Load todo',
}

export class TodoCreateAction implements Action {
  readonly type = TodoActionsType.create;
  constructor(public payload: Todo) {}
}

export class TodoLoadAction implements Action {
  readonly type = TodoActionsType.load;
  constructor(public payload: Todo[]) {}
}

export type TodoActions = TodoCreateAction;
