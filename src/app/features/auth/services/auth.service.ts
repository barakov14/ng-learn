import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {LoginRequest, TokenResponse} from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router);


  private baseUrl = 'https://icherniakov.ru/yt-course';


  token: string | null = null;
  refreshToken: string | null = null;

  get isAuthenticated() {
    if(!this.token){
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.token;
  }


  login(requestBody: LoginRequest) {
    const payload = new FormData();
    payload.set('username', requestBody.username);
    payload.set('password', requestBody.password);

    return this.http.post<TokenResponse>(`${this.baseUrl}/auth/token`, payload).pipe(
      tap((val) => {
        this.setToken(val)
        this.router.navigate(['/']);
      })
    )
  }

  refreshTokenAndProceed() {
    return this.http.post<TokenResponse>(`${this.baseUrl}/auth/refresh`, {
      refresh_token: this.refreshToken
    })
      .pipe(
        tap((val) => {
          this.setToken(val)
        }),
        catchError(err => {
          this.logout()
          return throwError(err);
        })
      )
  }

  setToken(token: TokenResponse) {
    this.token = token.access_token
    this.refreshToken = token.refresh_token

    this.cookieService.set('token', token.access_token)
    this.cookieService.set('refreshToken', token.refresh_token)
  }

  logout() {
    this.cookieService.deleteAll()
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login'])
  }
}
