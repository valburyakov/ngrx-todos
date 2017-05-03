export const GET_TODOS = 'GET_TODOS';
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_ERROR = 'GET_TODOS_ERROR';

export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";

export const REMOVE_TODO = "REMOVE_TODO";

export const TOGGLE_TODO = 'TOGGLE_TODO';

export const FETCH_TODOS = 'FETCH_TODOS';

export function getTodos() {
  return {
    type: GET_TODOS
  };
}

export function fetchTodos() {
  return {
    type: FETCH_TODOS
  };
}

export function addTodo( title ) {
  return {
    type: ADD_TODO,
    payload: {
      title,
    }
  }
}

export function toggleTodo( id ) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
    }
  }
}

export function removeTodo( id ) {
  return {
    type: REMOVE_TODO,
    payload: {
      id,
    }
  }
}

const initialState = {
  data: [],
  pending: false,
  error: null
};

export function todos( state = initialState, { type, payload } ) {
  switch ( type ) {
    case GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false});
    case GET_TODOS_ERROR:
      return Object.assign({}, state, {pending: false, error: 'Error'});
    case ADD_TODO_SUCCESS:
      return Object.assign({}, state, {data: [...state.data, payload]});
    case TOGGLE_TODO:
      const newData = state.data.map(todo => {
        if(todo.id !== payload.id) {
          return todo;
        }
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      });
      return Object.assign({}, state, {data: newData});
    case REMOVE_TODO:
      const filtered = state.data.filter(todo => {
        return todo.id !== payload.id;
      });
      return Object.assign({}, state, {data: filtered});
    default:
      return state;
  }
}
