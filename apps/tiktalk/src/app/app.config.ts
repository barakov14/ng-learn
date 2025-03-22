import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { of } from 'rxjs';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from '@tt/auth';
import { AuthService, httpUrlInterceptor } from '@tt/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, httpUrlInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFastSVG({
      url: (name) => `/assets/icons/${name}.svg`,
    }),
    provideAppInitializer(() => {
      const authService = inject(AuthService);
      return authService.isAuthenticated ? authService.getCurrentUser() : of();
    }),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
