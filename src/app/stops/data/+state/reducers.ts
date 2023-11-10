import { createFeature, createReducer, on } from '@ngrx/store';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { stopsActions } from './actions';
import { PublicStop } from 'src/app/data-model/publicStop';

export const stopsFeatureKey = 'stops';

export interface StopsState {
  publicStops: PublicStop[];
  loadingPublicStops: boolean;

  favoriteStops: FavoriteStop[];
  loadingFavoriteStops: boolean;
}

export const initialStopsState: StopsState = {
  publicStops: [],
  loadingPublicStops: false,

  favoriteStops: [],
  loadingFavoriteStops: false,
};

export const stopsFeature = createFeature({
  name: 'stops',
  reducer: createReducer(
    initialStopsState,

    on(stopsActions.loadPublicStopsByName, (state) => {
      const publicStops = [] as PublicStop[];
      return {
        ...state,
        publicStops,
        loadingPublicStops: true,
      };
    }),

    on(stopsActions.loadPublicStopsByLocation, (state) => {
      const publicStops = [] as PublicStop[];
      return {
        ...state,
        publicStops,
        loadingPublicStops: true,
      };
    }),

    on(stopsActions.publicStopsLoaded, (state, action) => {
      const publicStops = action.publicStops;

      return {
        ...state,
        publicStops,
        loadingPublicStops: false,
      };
    }),

    on(stopsActions.loadFavoriteStops, (state) => {
      const favoriteStops = [] as FavoriteStop[];
      return {
        ...state,
        favoriteStops,
        loadingFavoriteStops: true,
      };
    }),

    on(stopsActions.favoriteStopsLoaded, (state, action) => {
      const favoriteStops = action.favoriteStops;
      return {
        ...state,
        favoriteStops,
        loadingFavoriteStops: false,
      };
    }),

    on(stopsActions.favoriteStopCreated, (state, action) => {
      const favoriteStop = action.favoriteStop;
      const favoriteStops = [...state.favoriteStops, favoriteStop];

      return {
        ...state,
        favoriteStops,
      };
    }),

    on(stopsActions.favoriteStopDeleted, (state, action) => {
      const indexToDelete = state.favoriteStops.findIndex(
        (s) => s.id == action.favoriteStopId
      );
      const favoriteStops = [
        ...state.favoriteStops.slice(0, indexToDelete),
        ...state.favoriteStops.slice(indexToDelete + 1),
      ];
      return {
        ...state,
        favoriteStops,
      };
    })
  ),
});
