import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { httpUrlInterceptor } from './core/interceptors/http-url.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { lastValueFrom, of } from 'rxjs';

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
      return lastValueFrom(authService.isAuthenticated ? authService.getCurrentUser() : of());
    }),
  ],
};
