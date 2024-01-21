import { User } from '../../models/models';
import { AuthActions, AuthActionsType } from './auth.actions';

export const AUTH_REDUCER_NODE = 'AUTH_REDUCER_NODE';

const initialState: User = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  image: '',
  token: '',
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionsType.create:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        gender: action.payload.gender,
        image: action.payload.image,
        token: action.payload.token,
      };
    case AuthActionsType.delete:
      return {
        initialState,
      };
    default:
      return state;
  }
};
