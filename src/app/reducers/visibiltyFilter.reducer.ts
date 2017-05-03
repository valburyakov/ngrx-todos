export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export function setVisibilityFilter( filter ) {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: filter
  }
}

export const visibilityFilter = ( state = "SHOW_ALL", action ) => {
  switch( action.type ) {
    case SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
};
