import { Routes } from '@angular/router';
import { StopSearchComponent } from './stop-search/stop-search.component';
import { FavoriteStopListComponent } from './favorite-stop-list/favorite-stop-list.component';

export const STOPS_ROUTES: Routes = [
  { path: '', redirectTo: 'search-stops', pathMatch: 'full' },
  {
    path: 'search-stops',
    component: StopSearchComponent,
  },
  {
    path: 'favorite-stops',
    component: FavoriteStopListComponent,
  },
];
