import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import todosReducer, * as fromTodos from './todos.reducer';
import visibilityFilter from './visibiltyFilter.reducer';
import { TodoFilter } from '../models/filter.model';

export interface AppState {
  todos: fromTodos.TodosState;
  filter: TodoFilter;
}

export default compose(combineReducers)({
  todos: todosReducer,
  filter: visibilityFilter
});

export const getTodosState = (state: AppState) => state.todos;
export const getFilterState = (state: AppState) => state.filter;
