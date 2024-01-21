import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_REDUCER_NODE } from './auth.reducer';
import { User } from 'src/app/models/models';

export const authFeatureSelector =
  createFeatureSelector<User>(AUTH_REDUCER_NODE);

export const loginSelector = createSelector(
  authFeatureSelector,
  (state) => state
);
