import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { favoriteStopsFeature } from './+state/favorite-stops/reducers';
import { favoriteStopsActions } from './+state/favorite-stops/actions';

@Injectable({ providedIn: 'root' })
export class FavoriteStopsFacade {
  private store = inject(Store);

  readonly favoriteStops = this.store.selectSignal(
    favoriteStopsFeature.selectFavoriteStops
  );

  async load(): Promise<void> {
    this.store.dispatch(favoriteStopsActions.loadFavoriteStops());
  }

  readonly favoriteStopsLoading = this.store.selectSignal(
    favoriteStopsFeature.selectLoading
  );
}
