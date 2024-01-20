import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo, TodoData, User } from '../models/models';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TodoLoadAction } from '../store/todo/todo.actions';
import { todoSelector } from '../store/todo/todo.selectors';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  user: User;
  getTodoURL: 'https://dummyjson.com/todos/user/';

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
    private readonly _store$: Store
  ) {}

  ngOnInit(): void {
    this._authService
      .getCurrentUser()
      .subscribe((responce) => (this.user = responce));
  }

  loadTodoList(): void {
    this.getTodoListFromServer().subscribe((responce) => {
      this._store$.dispatch(new TodoLoadAction(responce));
    });
  }

  getTodoListFromServer(): Observable<Todo[]> {
    return this._http
      .get<TodoData>(`${this.getTodoURL} + ${this.user.id}`) //
      .pipe(map((responce) => responce.todos));
  }

  getTodoListFromStore(): Observable<Todo[]> {
    return this._store$.pipe(select(todoSelector));
  } //проверить, точно надо оставить?
}
