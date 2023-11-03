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
];
