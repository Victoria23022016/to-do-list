import { Todo } from 'src/app/models/models';
import { TodoActions, TodoActionsType } from './todo.actions';

export const TODO_REDUCER_NODE = 'TODO_REDUCER_NODE';

const initialState: Todo[] = [];

export const TodoReducer = (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case TodoActionsType.create:
      return [
        ...state,
        { id: action.payload.id, todo: action.payload.todo, completed: false },
      ];
    case TodoActionsType.load:
      return action.payload;
    case TodoActionsType.delete:
      return state.filter((todo) => todo.id !== action.payload);

    case TodoActionsType.check:
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      );

    case TodoActionsType.edit:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              todo: action.payload.text,
            }
          : todo
      );
    default:
      return state;
  }
};
