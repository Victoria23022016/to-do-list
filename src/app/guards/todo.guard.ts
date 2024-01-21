import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class TodoGuard {
  constructor(private readonly _authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this._authService.checkUserInStorage();
  }
}

export const CanActivateTodo: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(TodoGuard).canActivate(route, state);
};
