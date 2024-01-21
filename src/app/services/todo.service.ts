import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo, TodoData, User } from '../models/models';
import { Store, createAction, select } from '@ngrx/store';
import { Observable, map, takeUntil, tap } from 'rxjs';
import {
  TodoCheckAction,
  TodoCreateAction,
  TodoDeleteAction,
  TodoLoadAction,
} from '../store/todo/todo.actions';
import { todoSelector } from '../store/todo/todo.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  user: User;
  addURL = 'https://dummyjson.com/todos/add';
  headers = { 'Content-Type': 'application/json' };

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
    private readonly _store$: Store,
    private readonly _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this._authService.getCurrentUserFromStorage().subscribe((responce) => {
      this.user = responce;
      this.addTodoListToStore(responce);
    });
  }

  addTodoListToStore(user): Observable<Todo[]> {
    return this._http
      .get<TodoData>(`https://dummyjson.com/todos/user/${user.id}`)
      .pipe(
        map((responce) => responce.todos),
        tap((responce) => this._store$.dispatch(new TodoLoadAction(responce)))
      );
  }

  getTodoListFromStore(): Observable<Todo[]> {
    return this._store$.pipe(select(todoSelector));
  }

  addTodo(text: string, user: User) {
    const todo = this._makeTodo(text, user);
    this._store$.dispatch(new TodoCreateAction(todo));
    this._http.post<Todo>(this.addURL, todo, {
      headers: new HttpHeaders(this.headers),
    });
  }

  deleteTodo(id: number): void {
    this._store$.dispatch(new TodoDeleteAction(id));
  }

  checkTodo(id: number): void {
    this._store$.dispatch(new TodoCheckAction(id));
  }

  private _makeTodo(text: string, user: User): Todo {
    const id = this._makeId(1, 100);
    return {
      id: id,
      todo: text,
      completed: false,
      userId: user.id,
    };
  }

  private _makeId(min, max): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
