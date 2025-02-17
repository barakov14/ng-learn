import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@tt/auth/data-access';
import { provideFastSVG } from '@push-based/ngx-fast-svg';
import { httpUrlInterceptor } from '@tt/common/data-access';
import { AuthService } from '@tt/auth/data-access';
import { of } from 'rxjs';

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
  ],
};
