import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DestroyRef, Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo, TodoData, User } from '../models/models';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, EMPTY, Observable, catchError, map, tap } from 'rxjs';
import {
  TodoCheckAction,
  TodoCreateAction,
  TodoDeleteAction,
  TodoEditAction,
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
  todosURL = 'https://dummyjson.com/todos/';
  userTodosURL = 'https://dummyjson.com/todos/user/';
  headers = { 'Content-Type': 'application/json' };
  localStorageMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
    private readonly _store$: Store,
    private readonly _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this._authService
      .getCurrentUserFromStorage()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((responce) => {
        this.user = responce;
        this.addTodoListToStore(responce);
      });
  }

  addTodoListToStore(user): Observable<Todo[]> {
    return this._http.get<TodoData>(`${this.userTodosURL}${user.id}`).pipe(
      map((responce) => responce.todos),
      tap((responce) => this._store$.dispatch(new TodoLoadAction(responce))),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      })
    );
  }

  getTodoListFromStore(): Observable<Todo[]> {
    return this._store$.pipe(select(todoSelector));
  }

  addTodo(text: string, user: User) {
    const todo = this._makeTodo(text, user);
    this._store$.dispatch(new TodoCreateAction(todo));

    if (this.localStorageMode.getValue()) {
      this._recordTodoListToLocalStorage();
    } else {
      this._http
        .post<Todo>(this.addURL, todo, {
          headers: new HttpHeaders(this.headers),
        })
        .pipe(
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        );
    }
  }

  deleteTodo(id: number): void {
    this._store$.dispatch(new TodoDeleteAction(id));

    if (this.localStorageMode.getValue()) {
      this._recordTodoListToLocalStorage();
    } else {
      this._http.delete(`${this.todosURL}${id}`).pipe(
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
    }
  }

  checkTodo(id: number): void {
    this._store$.dispatch(new TodoCheckAction(id));

    if (this.localStorageMode.getValue()) {
    } else {
      this._http
        .put(
          `${this.todosURL}${id}`,
          { completed: false },
          { headers: new HttpHeaders(this.headers) }
        )
        .pipe(
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        );
    }
  }

  editTodo(id: number, text: string): void {
    this._store$.dispatch(new TodoEditAction({ id, text }));

    if (this.localStorageMode.getValue()) {
      this._recordTodoListToLocalStorage();
    } else {
      this._http
        .put(
          `${this.todosURL}${id}`,
          { todo: text },
          { headers: new HttpHeaders(this.headers) }
        )
        .pipe(
          catchError((error) => {
            console.log(error);
            return EMPTY;
          })
        );
    }
  }

  private _recordTodoListToLocalStorage(): void {
    this.getTodoListFromStore().subscribe((todoList) => {
      window.localStorage['todoList'] = JSON.stringify(todoList);
    });
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
