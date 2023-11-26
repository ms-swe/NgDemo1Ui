import { Routes } from '@angular/router';
import { Play1Component } from './play1/play1.component';

export const PLAYGROUND_ROUTES: Routes = [
  { path: '', redirectTo: 'play-1', pathMatch: 'full' },
  {
    path: 'play-1',
    component: Play1Component,
    providers: [],
  },
];
