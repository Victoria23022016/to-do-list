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
import { AUTH_REDUCER_NODE, authReducer } from './store/auth/auth.reducer';
import { TodoReducer, TODO_REDUCER_NODE } from './store/todo/todo.reducer';
import { TodoGuard } from './guards/todo.guard';
import { TodoToolsUiComponent } from './todo-tools-ui/todo-tools-ui.component';
import { NgOptimizedImage } from '@angular/common';
import { TodoLogoutUiComponent } from './todo-logout-ui/todo-logout-ui.component';

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
    TodoToolsUiComponent,
    TodoLogoutUiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      AUTH_REDUCER_NODE: authReducer,
      TODO_REDUCER_NODE: TodoReducer,
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    NgOptimizedImage,
  ],
  providers: [TodoGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
