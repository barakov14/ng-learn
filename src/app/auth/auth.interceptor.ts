import {HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';
import {catchError, switchMap, tap, throwError} from 'rxjs';


let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.token

  if(!token) return next(req);

  if(isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }

  return next(addToken(req, token)).pipe(
    catchError(err => {
      if(err.status === 403) {
        return refreshAndProceed(authService, req, next)
      }
      return throwError(err);
    })
  );
};

const refreshAndProceed = (
  authService: AuthService, req: HttpRequest<any>, next: HttpHandlerFn
) => {
  isRefreshing = true
  return authService.refreshTokenAndProceed()
    .pipe(
      switchMap((val) => next(addToken(req, val.access_token))),
      tap(() => isRefreshing = false),
    )
}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
}
