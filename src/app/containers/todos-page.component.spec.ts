import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { AppState } from '../reducers';
import { TodospageComponent } from './todos-page.component';
import { TodosEffects } from '../effects/todos.effects';
import { TodoActions } from '../actions/todo.actions';
import { FilterActions } from '../actions/filter.actions';
import { MockStore } from '../testing/mock-store';
import { TodoFilter } from '../models/filter.model';
import { TodoModule } from '../components/todo.module';

describe('Container: TodospageComponent', () => {
  let component: TodospageComponent;
  let fixture: ComponentFixture<TodospageComponent>;
  let mockStore: MockStore<AppState>;
  let todoActions: TodoActions;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    todos: {
      pending: false,
      error: null,
      data: [
        { id: 1, title: 'Some todo', completed: false }
      ]
    },
    filter: 'SHOW_ALL' as TodoFilter
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TodoModule,
        EffectsModule,
        StoreModule.provideStore({}),
      ],
      providers: [
        TodosEffects,
        { provide: Store, useValue: new MockStore<AppState>(initialState)}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockStore = TestBed.get(Store);
    todoActions = TestBed.get(TodoActions);
    dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create instance with subscriptions', () => {
    expect(component).toBeTruthy();

    component.todos$.subscribe(todos => {
      expect(todos).toEqual(initialState.todos)
    });

    component.activeFilter$.subscribe(filter => {
      expect(filter).toEqual(initialState.filter)
    })
  });

  it('should add new todo', () => {
    component.addTodo('new todo');

    expect(dispatchSpy).toHaveBeenCalledWith(todoActions.addTodo('new todo'));
  });

  it('should toggle todo item', () => {
    const todoItem = initialState.todos.data[0];
    component.toggleTodo(todoItem);

    expect(dispatchSpy).toHaveBeenCalledWith(todoActions.toggleTodo(todoItem));
  });

  it('should remove todo', () => {
    const todoItem = initialState.todos.data[0];
    component.removeTodo(todoItem);

    expect(dispatchSpy).toHaveBeenCalledWith(todoActions.removeTodo(todoItem));
  });

  it('should change filter', () => {
    const filterActions = TestBed.get(FilterActions);
    const newFilter: TodoFilter = 'SHOW_COMPLETED';
    component.changeFilter(newFilter);

    expect(dispatchSpy).toHaveBeenCalledWith(filterActions.setVisibilityFilter(newFilter));
  });

});
