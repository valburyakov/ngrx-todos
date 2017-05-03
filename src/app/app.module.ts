import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoComponent } from './components/todos/todo.component';
import { todos } from './reducers/todos.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './effects/todos.effects';
import { TodosService } from './services/todos.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddTodoComponent } from './components/todos/add-todo.component';
import { TodospageComponent } from './components/todos/todospage.component';
import { HomepageComponent } from './components/home/homepage.component';
import { FilterComponent } from './components/filter/filter.component';
import { AppRoutingModule } from './app-routing.module';
import { visibilityFilter } from './reducers/visibiltyFilter.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent,
    AddTodoComponent,
    TodospageComponent,
    HomepageComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    StoreModule.provideStore({todos, visibilityFilter}),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5,
    }),
    EffectsModule.run(TodosEffects),
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
