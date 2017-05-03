import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TodospageComponent } from './components/todos/todospage.component';
import { HomepageComponent } from './components/home/homepage.component';

const appRoutes: Routes = [
  { path: '',   component: HomepageComponent, pathMatch: 'full' },
  { path: 'todos', component: TodospageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
