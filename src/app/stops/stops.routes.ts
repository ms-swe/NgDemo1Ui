import { Routes } from '@angular/router';
import { PublicStopSearchComponent } from './public-stop-search/public-stop-search.component';
import { FavoriteStopListComponent } from './favorite-stop-list/favorite-stop-list.component';
import { provideState } from '@ngrx/store';
import { stopsFeature } from './data';
import { provideEffects } from '@ngrx/effects';
import { stopsEffects } from './data/+state/effects';

export const STOPS_ROUTES: Routes = [
  { path: '', redirectTo: 'search-public-stops', pathMatch: 'full' },
  {
    path: 'search-public-stops',
    component: PublicStopSearchComponent,
    providers: [provideState(stopsFeature), provideEffects(stopsEffects)],
  },
  {
    path: 'favorite-stops',
    component: FavoriteStopListComponent,
    providers: [provideState(stopsFeature), provideEffects(stopsEffects)],
  },
];
