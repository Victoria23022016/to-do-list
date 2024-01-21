import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Store, select } from '@ngrx/store';
import { Todo, User } from '../models/models';
import { loginSelector } from '../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { todoSelector } from '../store/todo/todo.selectors';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
})
export class TodoWidgetComponent {
  todoList$: Observable<Todo[]>;
  user$: Observable<User>;

  constructor(
    private readonly _todoService: TodoService,
    private readonly _store$: Store,
    private readonly _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this._authService.getCurrentUser();
    this.todoList$ = this._todoService.getTodoListFromStore();
  }

  logoutUser(): void {}
}
