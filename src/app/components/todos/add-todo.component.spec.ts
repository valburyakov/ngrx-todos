import { AddTodoComponent } from './add-todo.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { click, queryFor } from '../../testing/helper';

describe('AddTodoComponent', () => {

  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let inputEl: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [
        ReactiveFormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    inputEl = queryFor(fixture, 'input').nativeElement;
    fixture.detectChanges();
  }));

  it('should emit add event with new input value', (done) => {
    component.add.subscribe(todo => {
      expect(todo).toEqual('New todo');
      done();
    });

    inputEl.value = 'New todo';
    inputEl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    click(queryFor(fixture, 'button'));
  });

  it('should reset input control on success action', () => {
    inputEl.value = 'New todo';
    component.reset = true;
    fixture.detectChanges();

    expect(inputEl.value).toEqual('');
  });

});
