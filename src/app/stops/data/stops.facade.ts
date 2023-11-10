import { Injectable, Signal, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { stopsFeature } from './+state/reducers';
import { stopsActions } from './+state/actions';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';

@Injectable({ providedIn: 'root' })
export class stopsFacade {
  private store = inject(Store);

  readonly publicStops = this.store.selectSignal(
    stopsFeature.selectPublicStops
  );

  async loadPublicStopsByName(name: string): Promise<void> {
    this.store.dispatch(stopsActions.loadPublicStopsByName({ name }));
  }

  async loadPublicStopsByLocation(
    lon: string,
    lat: string,
    radius: string
  ): Promise<void> {
    this.store.dispatch(
      stopsActions.loadPublicStopsByLocation({ lon, lat, radius })
    );
  }

  readonly loadingPublicStops = this.store.selectSignal(
    stopsFeature.selectLoadingPublicStops
  );

  readonly favoriteStops = this.store.selectSignal(
    stopsFeature.selectFavoriteStops
  );

  async loadFavoriteStops(): Promise<void> {
    this.store.dispatch(stopsActions.loadFavoriteStops());
  }

  readonly loadingFavoriteStops = this.store.selectSignal(
    stopsFeature.selectLoadingFavoriteStops
  );

  isFavoriteStop(vgnKennung: number): Signal<boolean> {
    return computed(() => {
      const index = this.favoriteStops().findIndex(
        (favoriteStop) => favoriteStop.vgnKennung == vgnKennung
      );
      return index >= 0;
    });
  }

  async createFavoriteStop(
    vgnKennung: number,
    haltestellenname: string
  ): Promise<void> {
    let favoriteStop: FavoriteStop = {
      vgnKennung: vgnKennung,
      haltestellenname: haltestellenname,
    };
    this.store.dispatch(stopsActions.createFavoriteStop({ favoriteStop }));
  }

  async deleteFavoriteStop(vgnKennung: number): Promise<void> {
    const favoriteStopToDelete = this.favoriteStops().find(
      (s) => s.vgnKennung == vgnKennung
    );
    if (favoriteStopToDelete?.id) {
      this.store.dispatch(
        stopsActions.deleteFavoriteStop({
          favoriteStopId: favoriteStopToDelete.id,
        })
      );
    }
  }
}
