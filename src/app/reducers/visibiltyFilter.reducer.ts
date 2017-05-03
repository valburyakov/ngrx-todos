import { Action } from '@ngrx/store';
import { FilterActions } from '../actions/filter.actions';

export const visibilityFilter = (state = "SHOW_ALL", action: Action) => {
  switch( action.type ) {
    case FilterActions.SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
};
