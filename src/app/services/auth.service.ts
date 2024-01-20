import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData, User } from '../models/models';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LoginCreateAction } from '../store/login/login.actions';
import { loginSelector } from '../store/login/login.selectors';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginURL = 'https://dummyjson.com/auth/login';
  currentUserURL = 'https://dummyjson.com/auth/me';
  loginHeaders = { 'Content-Type': 'application/json' };

  constructor(
    private readonly _http: HttpClient,
    private readonly _store$: Store<User>
  ) {}

  login(formData: AuthData) {
    this.getToken(formData).subscribe((response) => {
      this._addTokenToLocalStorage(response);
      this._store$.dispatch(new LoginCreateAction(response));
    });
  }

  auth(): void {
    this._getUserDataByToken().subscribe((responce) => {
      //add unsubscribe
      this._store$.dispatch(new LoginCreateAction(responce));
    });
  }

  getToken(formData: AuthData): Observable<User> {
    return this._http.post<User>(this.loginURL, formData, {
      headers: new HttpHeaders(this.loginHeaders),
    });
  }

  getCurrentUser(): Observable<User> {
    return this._store$.pipe(select(loginSelector));
  }

  checkTokenInLocalStorage(): boolean {
    return window.localStorage['bearerToken'] ? true : false;
  }

  private _addTokenToLocalStorage(user: User): void {
    window.localStorage['bearerToken'] = user.token;
  }

  private _getUserDataByToken(): Observable<User> {
    const bearerToken = window.localStorage['bearerToken'];
    return this._http.get<User>(this.currentUserURL, {
      headers: new HttpHeaders({ Authorization: `Bearer ${bearerToken}` }),
    });
  }
}
