import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodosComponent } from './todos/todos.component';
import { TodoComponent } from './todos/todo.component';
import { AddTodoComponent } from './todos/add-todo.component';
import { TodospageComponent } from '../containers/todos-page.component';
import { FilterComponent } from './filter/filter.component';
import { TodoActions } from '../actions/todo.actions';
import { FilterActions } from '../actions/filter.actions';
import { TodosService } from '../services/todos.service';

@NgModule({
  imports:      [ CommonModule, FormsModule, ReactiveFormsModule ],
  declarations: [ TodospageComponent, FilterComponent, TodosComponent, TodoComponent, AddTodoComponent ],
  providers:    [ TodoActions, FilterActions, TodosService],
  exports:      [ TodospageComponent ],
})
export class TodoModule { }
