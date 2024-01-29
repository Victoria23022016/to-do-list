import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../../models/models';
import { TODO_REDUCER_NODE } from './todo.reducer';

export const todoFeatureSelector =
  createFeatureSelector<Todo[]>(TODO_REDUCER_NODE);

export const todoSelector = createSelector(
  todoFeatureSelector,
  (state) => state
);
