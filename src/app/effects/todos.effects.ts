import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { TodosService } from '../services/todos.service';
import { TodoActions } from '../actions/todo.actions';

@Injectable()
export class TodosEffects {
  constructor( private actions$: Actions,
               private todoActions: TodoActions,
               private todosService: TodosService,
               private store: Store<any> ) {
  }

  @Effect() getTodos$ = this.actions$
    .ofType(TodoActions.GET_TODOS)
    .withLatestFrom(this.store.select("visibilityFilter"), ( action, filter ) => filter)
    .switchMap(filter =>
      this.todosService.getTodos(filter)
        .map(todos => this.todoActions.getTodosSucces(todos))
        .catch(() => Observable.of({type: TodoActions.GET_TODOS_ERROR})));

  @Effect() addTodo$ = this.actions$
    .ofType(TodoActions.ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload.title)
        .map(todo => this.todoActions.addTodoSuccess(todo) )
        .catch(() => Observable.of({type: TodoActions.ADD_TODO_ERROR})));

}
