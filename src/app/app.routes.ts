import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'stops',
    loadChildren: () =>
      import('./stops/stops.routes').then((m) => m.STOPS_ROUTES),
  },
  {
    path: 'drawing',
    loadChildren: () =>
      import('./drawing/drawing.routes').then((m) => m.DRAWING_ROUTES),
  },
  {
    path: 'playground',
    loadChildren: () =>
      import('./playground/playground.routes').then((m) => m.PLAYGROUND_ROUTES),
  },
];
