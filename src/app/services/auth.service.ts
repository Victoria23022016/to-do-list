import { DestroyRef, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData, User } from '../models/models';
import { Observable, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AuthCreateAction } from '../store/auth/auth.actions';
import { loginSelector } from '../store/auth/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginURL = 'https://dummyjson.com/auth/login';
  currentUserURL = 'https://dummyjson.com/auth/me';
  loginHeaders = { 'Content-Type': 'application/json' };

  constructor(
    private readonly _http: HttpClient,
    private readonly _store$: Store<User>,
    private readonly _destroyRef: DestroyRef
  ) {
    if (this.checkTokenInLocalStorage()) {
      this.auth().pipe(takeUntilDestroyed(this._destroyRef)).subscribe();
    }
  }

  login(formData: AuthData): Observable<User> {
    return this.getUserFromServer(formData).pipe(
      tap((user) => this._addTokenToLocalStorage(user.token)),
      tap((user) => this._store$.dispatch(new AuthCreateAction(user)))
    );
  }

  auth(): Observable<User> {
    return this._getUserDataByToken().pipe(
      tap((user) => this._store$.dispatch(new AuthCreateAction(user)))
    );
  }

  getUserFromServer(formData: AuthData): Observable<User> {
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

  checkUserInStorage(): boolean {
    let check: boolean;
    this._store$
      .pipe(select(loginSelector))
      .subscribe((responce) => (check = !!responce.id));
    return check;
  }

  private _addTokenToLocalStorage(token: string): void {
    window.localStorage['bearerToken'] = token;
  }

  private _getUserDataByToken(): Observable<User> {
    const bearerToken = window.localStorage['bearerToken'];
    return this._http.get<User>(this.currentUserURL, {
      headers: new HttpHeaders({ Authorization: `Bearer ${bearerToken}` }),
    });
  }
}
