import { Action } from '@ngrx/store';
import { Todo } from '../../models/models';

export enum TodoActionsType {
  create = 'Create todo',
  load = 'Load todo',
  delete = 'Delete todo',
  check = 'Check todo',
  edit = 'Edit todo',
}

export class TodoCreateAction implements Action {
  readonly type = TodoActionsType.create;
  constructor(public payload: Todo) {}
}

export class TodoLoadAction implements Action {
  readonly type = TodoActionsType.load;
  constructor(public payload: Todo[]) {}
}

export class TodoDeleteAction implements Action {
  readonly type = TodoActionsType.delete;
  constructor(public payload: number) {}
}

export class TodoCheckAction implements Action {
  readonly type = TodoActionsType.check;
  constructor(public payload: number) {}
}

export class TodoEditAction implements Action {
  readonly type = TodoActionsType.edit;
  constructor(public payload: { id: number; text: string }) {}
}

export type TodoActions =
  | TodoCreateAction
  | TodoLoadAction
  | TodoDeleteAction
  | TodoCheckAction
  | TodoEditAction;
