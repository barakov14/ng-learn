import { Routes } from '@angular/router';
import {accessGuard} from './core/guards/access.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component')
      .then(c => c.LoginComponent),
  },
  {
    path: '',
    loadComponent: () => import('./core/layout/layout.component')
      .then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/profile/pages/profiles-search/profiles-search.component')
          .then(c => c.ProfilesSearchComponent)
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('./features/profile/pages/profile/profile.component')
          .then(c => c.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/profile/pages/profile-settings/settings-page.component')
          .then(c => c.SettingsPageComponent)
      }
    ],
    canActivate: [accessGuard]
  }
];
