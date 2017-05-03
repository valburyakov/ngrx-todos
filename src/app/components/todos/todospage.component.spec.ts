import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodospageComponent } from './todospage.component';
import { TodosEffects } from '../../effects/todos.effects';
import { TodosService } from '../../services/todos.service';
import { StoreModule } from '@ngrx/store';
import { TodosComponent } from './todos.component';
import { FilterComponent } from '../filter/filter.component';
import { AddTodoComponent } from './add-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { EffectsModule } from '@ngrx/effects';
import { visibilityFilter } from '../../reducers/visibiltyFilter.reducer';
import { todos } from '../../reducers/todos.reducer';

describe('TodospageComponent', () => {
  let component: TodospageComponent;
  let fixture: ComponentFixture<TodospageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        EffectsModule,
        StoreModule.provideStore({todos, visibilityFilter})],
      declarations: [ TodospageComponent, AddTodoComponent, TodosComponent, TodoComponent, FilterComponent ],
      providers: [
        TodosEffects, TodosService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodospageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
