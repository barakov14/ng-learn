import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PostsDataService, PostsEffects, postsFeature } from '@tt/posts';
import { accessGuard } from '@tt/auth';
import { ProfileDataService, ProfileEffects, profileFeature, ProfileService } from '@tt/profile';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@tt/auth').then((c) => c.LoginComponent),
  },
  {
    path: 'experimental',
    loadChildren: () =>
      import('./features/experimental/experimental.routes').then((r) => r.experimentalRoutes),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then((c) => c.LayoutComponent),
    providers: [
      provideState(profileFeature),
      provideEffects(ProfileEffects),
      ProfileService,
      ProfileDataService,
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('@tt/profile').then((c) => c.ProfilesSearchComponent),
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('@tt/profile').then((c) => c.ProfileComponent),
        providers: [provideState(postsFeature), provideEffects(PostsEffects), PostsDataService],
      },
      {
        path: 'settings',
        loadComponent: () => import('@tt/profile').then((c) => c.ProfileSettingsComponent),
      },
      {
        path: 'chats',
        loadChildren: () => import('@tt/chats').then((r) => r.chatsRoutes),
      },
    ],
    canActivate: [accessGuard],
  },
];
