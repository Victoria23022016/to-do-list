import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Todo, TodoData, User } from '../models/models';
import { Store, select } from '@ngrx/store';
import { loginSelector } from '../store/login/login.selectors';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  user: User;
  getTodoURL: 'https://dummyjson.com/todos/user/';

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
    private readonly _store$: Store
  ) {}
  //провписать что возвращают
  loadTodoList() {}

  getTodos(id: number): Observable<TodoData> {
    return this._http.get<TodoData>(`${this.getTodoURL} + ${id}`);
  }
}
