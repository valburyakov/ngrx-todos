import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo.component';
import { TodoItem } from '../../models/todo.model';
import { click, queryFor } from '../../testing/helper';
import { DebugElement } from '@angular/core';

describe('Presentation: TodoComponent', () => {
  const todo: TodoItem = { id: 1, title: 'Some todo', completed: false };
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
    todoEl = queryFor(fixture, 'input');
  }));

  it('should display todo Item', () => {
    expect(component).toBeTruthy();
    expect(todoEl).toBeTruthy();
    expect(todoEl.properties['checked']).toBeFalsy();
    expect(queryFor(fixture, 'span').nativeElement.textContent).toEqual(todo.title);
  });

  it('should emit toggle event on change', (done) => {
    component.toggle.subscribe( (item: TodoItem) => {
      expect(item).toEqual(todo);
      done();
    });

    todoEl.triggerEventHandler('change', null);
  });

  it('should emit remove event', (done) => {
    const deleteBtn = queryFor(fixture, 'button');

    component.remove.subscribe((item: TodoItem) => {
      expect(item).toEqual(todo);
      done();
    });

    click(deleteBtn);
  });
});
