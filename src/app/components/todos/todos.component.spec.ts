import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodosComponent } from './todos.component';
import { TEST_DATA } from '../../testing/test.data';
import { queryAllFor, queryFor } from '../../testing/helper';
import { TodoComponent } from './todo.component';

describe('Presentation: TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent, TodoComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    component.todos = {
      pending: true,
      error: 'Some error',
      data: TEST_DATA.todos
    };
    fixture.detectChanges();
  }));

  it('should display todoList', () => {
    expect(component).toBeTruthy();
    const list = queryAllFor(fixture, 'app-todo');
    expect(list.length).toBe(TEST_DATA.todos.length);
  });

  it('should display error message', () => {
    const errorMsg = queryFor(fixture, '#error').nativeElement;
    expect(errorMsg.textContent).toEqual('Some error');
  });

  it('should display loading status', () => {
    const loadStatus = queryFor(fixture, '#status').nativeElement;
    expect(loadStatus.textContent).toEqual('Loading...');
  });

});
