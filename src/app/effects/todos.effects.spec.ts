import { TodosService } from '../services/todos.service';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { TodosEffects } from './todos.effects';
import { Observable } from 'rxjs/Observable';
import { GET_TODOS_SUCCESS, getTodos } from '../reducers/todos.reducer';
import { StoreModule } from '@ngrx/store';
import { visibilityFilter } from '../reducers/visibiltyFilter.reducer';

describe('TodoEffects', () => {
  let runner, todosEffects, todosService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      StoreModule.provideStore({ visibilityFilter }),
    ],
    providers: [
      TodosEffects,
      {
        provide: TodosService,
        useValue: jasmine.createSpyObj('todosService', ['getTodos', 'addTodo'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    todosEffects = TestBed.get(TodosEffects);
    todosService = TestBed.get(TodosService);
  });

  it('getTodos$', () => {
    const todos = [
      {id: 1, title: 'Learn ngrx/store', completed: true},
      {id: 2, title: 'Learn ngrx/effects', completed: false}
    ];

    todosService.getTodos.and.returnValue(Observable.of(todos));

    const expectedResult = ({type: GET_TODOS_SUCCESS, payload: todos});

    runner.queue(getTodos());

    todosEffects.getTodos$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });

  it('addTodo$', () => {
    const newTodo = {
      id: 111,
      title: 'New Item',
      completed: false
    };

    todosService.getTodos.and.returnValue(Observable.of(newTodo));
    const expectedResult = ({type: GET_TODOS_SUCCESS, payload: newTodo});

    runner.queue(getTodos());

    todosEffects.getTodos$.subscribe(result => {
      expect(result).toEqual(expectedResult);
    });
  });


});
