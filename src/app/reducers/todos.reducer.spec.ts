import {
  todos, ADD_TODO_SUCCESS, GET_TODOS, GET_TODOS_SUCCESS, REMOVE_TODO,
  TOGGLE_TODO
} from './todos.reducer';

describe('Todos store', () => {
  let actual;

  const state = {
    data: [
      {id: 1, title: 'Item 1', completed: false},
      {id: 2, title: 'Item 2', completed: false}
    ],
    pending: false,
    error: null
  };

  it('should return current state when no valid actions have been made', () => {
    actual = todos(state, {type: 'INVALID_ACTION', payload: {}});

    expect(actual).toEqual(state);
  });

  it('should set pending to true when GET_TODOS is dispatched', () => {
    actual = todos(state, {type: GET_TODOS, payload: {}});

    expect(actual.pending).toBeTruthy();
    expect(actual.error).toBeNull();
    expect(actual.data).toEqual(state.data);
  });

  it('should set new data when GET_TODOS_SUCCESS is dispatched', () => {
    const initialState = {
      data: [],
      pending: true,
      error: null
    };

    actual = todos(initialState, {type: GET_TODOS_SUCCESS, payload: state.data.slice()});

    expect(actual.pending).toBeFalsy();
    expect(actual.data).toEqual(state.data);
  });

  it('should add new item to data when ADD_TODO_SUCCESS is dispatched', () => {
    const newTodo = {
      id: 123,
      title: 'New title',
      completed: false
    };

    const expected = {
      data: state.data.concat(newTodo),
      pending: false,
      error: null
    };

    actual = todos(state, {type: ADD_TODO_SUCCESS, payload: newTodo });

    expect(actual).toEqual(expected);
  });

  it('should mark todo as completed when TOGGLE_TODO is dispatched', () => {
    const item_id = 1;
    actual = todos(state, {type: TOGGLE_TODO, payload: {id: item_id} });
    const [selectedItem] = actual.data.filter(todo => todo.id === item_id);

    expect(selectedItem.completed).toBeTruthy();
  });

  it('should remove todo when REMOVE_TODO is dispatched', () => {
    const item_id = 1;
    actual = todos(state, {type: REMOVE_TODO, payload: {id: item_id} });

    expect(actual.data.findIndex(todo => todo.id === item_id)).toEqual(-1)
  });

});
