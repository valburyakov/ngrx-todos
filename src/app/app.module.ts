import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { default as reducer } from './reducers';
import { AppComponent } from './containers/app.component';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './effects/todos.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HomepageComponent } from './containers/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoModule } from './components/todo.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    TodoModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(TodosEffects)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
