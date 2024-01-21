import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo, TodoData, User } from '../models/models';
import { Store, select } from '@ngrx/store';
import { Observable, map, takeUntil, tap } from 'rxjs';
import { TodoLoadAction } from '../store/todo/todo.actions';
import { todoSelector } from '../store/todo/todo.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  user: User;
  getTodoURL: 'https://dummyjson.com/todos/user/'; //переписать?

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
    private readonly _store$: Store,
    private readonly _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this._authService
      .getCurrentUser()
      .subscribe((responce) => (this.user = responce));
  }

  getTodoListByUser(user: User): Observable<Todo[]> {
    return this._http
      .get<TodoData>(`https://dummyjson.com/todos/user/${user.id}`) //.get<TodoData>(`${this.getTodoURL} + ${user.id}`)
      .pipe(
        map((responce) => responce.todos),
        tap((responce) => this._store$.dispatch(new TodoLoadAction(responce)))
      );
  }

  getTodoListFromStore(): Observable<Todo[]> {
    return this._store$.pipe(select(todoSelector));
  }
}
