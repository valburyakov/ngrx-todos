import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterActions {
  static SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";
  setVisibilityFilter(filter): Action {
    return {
      type: FilterActions.SET_VISIBILITY_FILTER,
      payload: filter
    }
  }
}
