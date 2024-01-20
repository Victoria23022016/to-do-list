import { User } from '../../models/models';
import { LoginActions, LoginActionsType } from './login.actions';

export const LOGIN_REDUCER_NODE = 'LOGIN_REDUCER_NODE';

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

export const loginReducer = (state = initialState, action: LoginActions) => {
  switch (action.type) {
    case LoginActionsType.create:
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
    default:
      return state;
  }
};
