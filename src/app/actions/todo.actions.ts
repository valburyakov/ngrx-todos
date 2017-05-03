import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TodoActions {

  static GET_TODOS = 'GET_TODOS';
  getTodos(): Action {
    return {
      type: TodoActions.GET_TODOS
    };
  }

  static GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
  getTodosSucces(todos): Action {
    return {
      type: TodoActions.GET_TODOS_SUCCESS,
      payload: todos
    };
  }

  static GET_TODOS_ERROR = 'GET_TODOS_ERROR';


  static ADD_TODO = "ADD_TODO";
  static ADD_TODO_ERROR = "ADD_TODO_ERROR";
  addTodo(title): Action {
    return {
      type: TodoActions.ADD_TODO,
      payload: {
        title,
      }
    }
  }

  static ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
  addTodoSuccess(todo): Action {
    return {
      type: TodoActions.ADD_TODO_SUCCESS,
      payload: todo
    }
  }

  static TOGGLE_TODO = 'TOGGLE_TODO';
  toggleTodo(id): Action {
    return {
      type: TodoActions.TOGGLE_TODO,
      payload: {
        id,
      }
    }
  }

  static REMOVE_TODO = "REMOVE_TODO";
  removeTodo(id): Action {
    return {
      type: TodoActions.REMOVE_TODO,
      payload: {
        id,
      }
    }
  }

}
