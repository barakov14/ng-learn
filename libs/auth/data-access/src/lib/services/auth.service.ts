import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginRequest, TokenResponse } from '../models/auth';
import { Profile } from '@tt/common/data-access';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  token: string | null = null;
  refreshToken: string | null = null;

  readonly currentUser = signal<Profile | null>(null);

  get isAuthenticated() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(requestBody: LoginRequest) {
    const payload = new FormData();
    payload.set('username', requestBody.username);
    payload.set('password', requestBody.password);

    return this.http.post<TokenResponse>('/auth/token', payload).pipe(
      tap((val) => {
        this.setToken(val);
        this.router.navigate(['/']);
      }),
    );
  }

  getCurrentUser() {
    return this.http.get<Profile>('/account/me').pipe(tap((res) => this.currentUser.set(res)));
  }

  refreshTokenAndProceed() {
    return this.http
      .post<TokenResponse>('/auth/refresh', {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => {
          this.setToken(val);
        }),
        catchError((err) => {
          this.logout();
          return throwError(err);
        }),
      );
  }

  setToken(token: TokenResponse) {
    this.token = token.access_token;
    this.refreshToken = token.refresh_token;

    this.cookieService.set('token', token.access_token);
    this.cookieService.set('refreshToken', token.refresh_token);
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }
}
