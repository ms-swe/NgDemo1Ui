import { Routes } from '@angular/router';
import { Play1Component } from './play1/play1.component';
import { Play0TabComponent } from './play0-tab/play0-tab.component';

export const PLAYGROUND_ROUTES: Routes = [
  { path: '', redirectTo: 'play-0-tab', pathMatch: 'full' },
  {
    path: 'play-0-tab',
    component: Play0TabComponent,
    providers: [],
  },
];
