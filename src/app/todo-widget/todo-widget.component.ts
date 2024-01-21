import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo, User } from '../models/models';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoWidgetComponent implements OnInit {
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
    this._authService
      .getCurrentUserFromStorage()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((user) => {
        this._todoService
          .addTodoListToStore(user)
          .pipe(takeUntilDestroyed(this._destroyRef))
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
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((user) => this._todoService.addTodo(text, user));
  }

  onDeleteTodo(id: number): void {
    this._todoService.deleteTodo(id);
  }

  onCheckTodo(id: number): void {
    this._todoService.checkTodo(id);
  }

  onEditTodo(event: { id: number; text: string }): void {
    this._todoService.editTodo(event.id, event.text);
  }

  onSortId(): void {
    //this.todoList$ = this._todoService.getTodoListFromStore().pipe(sort())
  }

  onSortCompleted(): void {}
}
