import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  return next(addToken(req, token)).pipe(
    catchError((err) => {
      if (err.status === 403) {
        return handle403Error(authService, req, next);
      }
      return throwError(() => err);
    }),
  );
};

const handle403Error = (
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshTokenAndProceed().pipe(
      switchMap((newTokens) => {
        refreshTokenSubject.next(newTokens.access_token);
        return next(addToken(req, newTokens.access_token));
      }),
      catchError((err) => {
        authService.logout(); // Выход из системы при ошибке
        return throwError(() => err);
      }),
      finalize(() => (isRefreshing = false)), // Сбрасываем флаг независимо от результата
    );
  } else {
    // Ждём, пока текущий процесс обновления токена завершится
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((newToken) => next(addToken(req, newToken!))),
    );
  }
};

const addToken = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
