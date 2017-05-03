import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TodosEffects } from '../../effects/todos.effects';
import { TodosService } from '../../services/todos.service';
import { TodoActions } from '../../actions/todo.actions';
import { FilterActions } from '../../actions/filter.actions';

@Component({
  selector: 'app-todospage',
  template: `
    <filters [filters]="filters"
             [active]="activeFilter$ | async"
             (changeFilter)="changeFilter($event)">
    </filters>
    <app-todos [todos]="todosModel$ | async" (toggle)="toggleTodo($event)" (remove)="removeTodo($event)"></app-todos>

    <app-add-todo (add)="addTodo($event)" [reset]="addTodoSuccess$ | async"></app-add-todo>
  `,
  styleUrls: ['./todospage.component.css']
})
export class TodospageComponent {
  todos$: Observable<any>;
  todosModel$: Observable<any>;
  addTodoSuccess$ : Observable<any>;
  activeFilter$ : Observable<any>;

  filters = [{id: "SHOW_ALL", title: "All"}, {id: "SHOW_COMPLETED", title: "Completed"}, {
    id: "SHOW_ACTIVE",
    title: "Active"
  }];

  constructor(private store: Store<any>,
              private todoActions: TodoActions,
              private filterActions: FilterActions,
              private todosEffects: TodosEffects,
              private todoService: TodosService) {
    this.store.dispatch(todoActions.getTodos());
    this.todos$ = store.select("todos");
    this.addTodoSuccess$ = this.todosEffects.addTodo$.filter(( { type }) => type === TodoActions.ADD_TODO_SUCCESS);
    this.activeFilter$ = store.select("visibilityFilter");
    this.todosModel$ = Observable.combineLatest(this.todos$, this.activeFilter$,
      (todos, filter) => {
        return {
          pending: todos.pending,
          filtered: this.todoService.getVisibleTodos(todos.data, filter)
        }
      }
    );
  }

  addTodo( todo ) {
    this.store.dispatch(this.todoActions.addTodo(todo));
  }

  toggleTodo( id ) {
    this.store.dispatch(this.todoActions.toggleTodo(id));
  }

  removeTodo( id ) {
    this.store.dispatch(this.todoActions.removeTodo(id))
  }

  changeFilter( filter ) {
    this.store.dispatch(this.filterActions.setVisibilityFilter(filter));
  }

}
