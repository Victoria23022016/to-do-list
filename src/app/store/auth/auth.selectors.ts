import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_REDUCER_NODE } from './auth.reducer';
import { UserState } from '../../models/models';

export const authFeatureSelector =
  createFeatureSelector<UserState>(AUTH_REDUCER_NODE);

export const loginSelector = createSelector(
  authFeatureSelector,
  (state) => state.user
);
