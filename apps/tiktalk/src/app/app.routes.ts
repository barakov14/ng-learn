import { Routes } from '@angular/router';
import { accessGuard } from '@tt/auth/data-access';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@tt/auth/feature-auth').then((c) => c.LoginComponent),
  },
  {
    path: 'experimental',
    loadChildren: () =>
      import('./features/experimental/experimental.routes').then((r) => r.experimentalRoutes),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@tt/profile/feature-profile-search').then((c) => c.ProfilesSearchComponent),
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('@tt/profile/feature-profile').then((c) => c.ProfileComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@tt/profile/feature-profile-settings').then((c) => c.ProfileSettingsComponent),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('../../../../libs/chats/chats.routes').then((r) => r.chatsRoutes),
      },
    ],
    canActivate: [accessGuard],
  },
];
