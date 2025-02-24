import { Routes } from '@angular/router';
import { accessGuard } from '@tt/auth/data-access';
import { provideState } from '@ngrx/store';
import { PostsDataService, postsFeature } from '@tt/posts/data-access';
import { provideEffects } from '@ngrx/effects';
import { PostsEffects } from '@tt/posts/data-access';
import { profileFeature } from '../../../../libs/profile/data-access/src/lib/store/profile.feature';
import { ProfileEffects } from '../../../../libs/profile/data-access/src/lib/store/profile.effects';
import { ProfileDataService, ProfileService } from '@tt/profile/data-access';
import { ChatsDataService, ChatsService } from '@tt/chats/data-access';
import { inject, provideEnvironmentInitializer } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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
    providers: [
      provideState(profileFeature),
      provideEffects(ProfileEffects),
      ProfileService,
      ProfileDataService,
      ChatsDataService,
      ChatsService,
      provideEnvironmentInitializer(() => {
        lastValueFrom(inject(ChatsService).connectWs());
      }),
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@tt/profile/feature-profile-search').then((c) => c.ProfilesSearchComponent),
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('@tt/profile/feature-profile').then((c) => c.ProfileComponent),
        providers: [provideState(postsFeature), provideEffects(PostsEffects), PostsDataService],
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
