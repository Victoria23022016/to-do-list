import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Store, select } from '@ngrx/store';
import { Todo, User } from '../models/models';
import { loginSelector } from '../store/auth/auth.selectors';
import { Observable, finalize, tap } from 'rxjs';
import { todoSelector } from '../store/todo/todo.selectors';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoWidgetComponent {
  todoList$: Observable<Todo[]> = this._todoService.getTodoListFromStore();
  user$: Observable<User>;

  constructor(
    private readonly _todoService: TodoService,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.user$ = this._authService.getCurrentUserFromStorage();
    this._authService.getCurrentUserFromStorage().subscribe((user) => {
      this._todoService
        .addTodoListToStore(user)
        .subscribe(() => this._todoService.getTodoListFromStore());
    });
  }

  logoutUser(): void {
    this._authService
      .deleteUser()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._router.navigate(['/auth']));
  }

  onCreate(text: string): void {
    this._authService
      .getCurrentUserFromStorage()
      .subscribe((user) => this._todoService.addTodo(text, user));
  }

  onDeleteTodo(id: number): void {
    this._todoService.deleteTodo(id);
  }

  onCheckTodo(id: number): void {
    this._todoService.checkTodo(id);
  }
}
