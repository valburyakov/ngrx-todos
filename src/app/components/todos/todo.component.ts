import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo',
  template: `
    <div>
    <label>
      <input type="checkbox" [checked]="todo.completed" (change)="toggle.emit(todo.id)" >
      <span>{{todo.title}}</span>
    </label>
      <button (click)="remove.emit(todo.id)">x</button>
    </div>
  `,
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Output() toggle = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Input() todo;

  constructor() { }

  ngOnInit() {
  }

}
