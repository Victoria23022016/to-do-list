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

    default:
      return state;
  }
};
