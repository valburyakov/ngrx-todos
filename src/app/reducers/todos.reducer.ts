import { TodoActions } from '../actions/todo.actions';
import { Action } from '@ngrx/store';

const initialState = {
  data: [],
  pending: false,
  error: null
};

export function todos( state = initialState, action: Action ) {
  switch ( action.type ) {
    case TodoActions.GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null});
    case TodoActions.GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: action.payload, pending: false});
    case TodoActions.GET_TODOS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});
    case TodoActions.ADD_TODO_SUCCESS:
      return Object.assign({}, state, {data: [...state.data, action.payload]});
    case TodoActions.TOGGLE_TODO:
      const newData = state.data.map(todo => {
        if(todo.id !== action.payload.id) {
          return todo;
        }
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      });
      return Object.assign({}, state, {data: newData});
    case TodoActions.REMOVE_TODO:
      const filtered = state.data.filter(todo => {
        return todo.id !== action.payload.id;
      });
      return Object.assign({}, state, {data: filtered});
    default:
      return state;
  }
}
