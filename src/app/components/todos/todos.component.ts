import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todos',
  template: `
    <p *ngIf="todos.pending">Loading...</p>
    <app-todo [todo]="todo"
          *ngFor="let todo of todos.filtered" (toggle)="toggle.emit($event)" (remove)="remove.emit($event)">
    </app-todo>
    <p *ngIf="todos.error">{{todos.error}}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  @Input() todos;
  @Output() toggle = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
