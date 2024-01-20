import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_REDUCER_NODE } from './login.reducer';
import { User } from '../../models/models';

export const loginFeatureSelector =
  createFeatureSelector<User>(LOGIN_REDUCER_NODE);

export const loginSelector = createSelector(
  loginFeatureSelector,
  (state) => state
);
