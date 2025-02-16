import { Routes } from '@angular/router';

export const experimentalRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/experimental.component').then((c) => c.ExperimentalComponent),
    children: [
      {
        path: 'tdf',
        loadComponent: () =>
          import('./components/experimental-tdf/experimental-tdf.component').then(
            (c) => c.ExperimentalTdfComponent,
          ),
      },
      {
        path: 'reactive',
        loadComponent: () =>
          import('./components/experimental-reactive/experimental-reactive.component').then(
            (c) => c.ExperimentalReactiveComponent,
          ),
      },
    ],
  },
];
