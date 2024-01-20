import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { TodoPageComponent } from './todo-page/todo-page.component';
import { TodoListUiComponent } from './todo-list-ui/todo-list-ui.component';
import { TodoWidgetComponent } from './todo-widget/todo-widget.component';
import { TodoFormUiComponent } from './todo-form-ui/todo-form-ui.component';
import { TodoItemUiComponent } from './todo-item-ui/todo-item-ui.component';
import { TodoEditUiComponent } from './todo-edit-ui/todo-edit-ui.component';
import { TodoProfileUiComponent } from './todo-profile-ui/todo-profile-ui.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { LOGIN_REDUCER_NODE, loginReducer } from './store/login/login.reducer';
import { TodoReducer, TODO_REDUCER_NODE } from './store/todo/todo.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TodoPageComponent,
    TodoListUiComponent,
    TodoWidgetComponent,
    TodoFormUiComponent,
    TodoItemUiComponent,
    TodoEditUiComponent,
    TodoProfileUiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ LOGIN_REDUCER_NODE: loginReducer }),
    StoreModule.forRoot({ TODO_REDUCER_NODE: TodoReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
