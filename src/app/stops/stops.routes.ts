import { Routes } from '@angular/router';
import { StopSearchComponent } from './stop-search/stop-search.component';
import { FavoriteStopListComponent } from './favorite-stop-list/favorite-stop-list.component';
import { provideState } from '@ngrx/store';
import { favoriteStopsFeature } from './data';
import { provideEffects } from '@ngrx/effects';
import { FavoriteStopsEffects } from './data/+state/favorite-stops/effects';

export const STOPS_ROUTES: Routes = [
  { path: '', redirectTo: 'search-stops', pathMatch: 'full' },
  {
    path: 'search-stops',
    component: StopSearchComponent,
    providers: [
      provideState(favoriteStopsFeature),
      provideEffects(FavoriteStopsEffects),
    ],
  },
  {
    path: 'favorite-stops',
    component: FavoriteStopListComponent,
    providers: [
      provideState(favoriteStopsFeature),
      provideEffects(FavoriteStopsEffects),
    ],
  },
];
