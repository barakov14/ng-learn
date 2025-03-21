import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PostsDataService, PostsEffects, postsFeature } from '@tt/posts';
import { accessGuard } from '@tt/auth';
import { ProfileDataService, ProfileEffects, profileFeature, ProfileService } from '@tt/profile';
import { inject, provideEnvironmentInitializer } from '@angular/core';
import { ChatsService } from '@tt/chats';
import { catchError, retry, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@tt/common';

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
      provideEnvironmentInitializer(() => {
        const chatsService = inject(ChatsService);
        const authService = inject(AuthService);
        chatsService
          .connectWs()
          .pipe(
            retry(3),
            catchError(() =>
              authService.refreshTokenAndProceed().pipe(switchMap(() => chatsService.connectWs())),
            ),
            takeUntilDestroyed(),
          )
          .subscribe({
            error: (err: Error) => {
              console.error(`WebSocket permanently failed: ${err.message}`);
            },
          });
      }),
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
