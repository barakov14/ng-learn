import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../auth/services/auth.service';

export const accessGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isAuthenticated

  if(isLoggedIn) return true

  return inject(Router).createUrlTree(['/login']);
};
