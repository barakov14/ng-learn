import { Routes } from '@angular/router';
import {accessGuard} from './auth/access.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component')
      .then(c => c.LoginPageComponent),
  },
  {
    path: '',
    loadComponent: () => import('./common-ui/layout/layout.component')
      .then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/search-page/search-page.component')
          .then(c => c.SearchPageComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile-page/profile-page.component')
          .then(c => c.ProfilePageComponent)
      },
    ],
    canActivate: [accessGuard]
  }
];
