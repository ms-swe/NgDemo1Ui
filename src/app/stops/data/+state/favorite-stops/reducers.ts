import { createFeature, createReducer, on } from '@ngrx/store';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { favoriteStopsActions } from './actions';

export const favoriteStopsFeatureKey = 'favoriteStops';

export interface FavoriteStopsState {
  favoriteStops: FavoriteStop[];
  loading: boolean; //TODO show in template
}

export const initialFavoriteStopsState: FavoriteStopsState = {
  favoriteStops: [],
  loading: false,
};

export const favoriteStopsFeature = createFeature({
  name: 'favoriteStops',
  reducer: createReducer(
    initialFavoriteStopsState,

    on(favoriteStopsActions.loadFavoriteStops, (state) => {
      const favoriteStops = [] as FavoriteStop[];
      const loading = true;
      return {
        ...state,
        favoriteStops,
        loading,
      };
    }),

    on(favoriteStopsActions.favoriteStopsLoaded, (state, action) => {
      const favoriteStops = action.favoriteStops;
      const loading = false;
      return {
        ...state,
        favoriteStops,
        loading,
      };
    })

    // on(favoriteStopsActions.updateFavoriteStop, (state, action) => {
    //   const favoriteStop = action.favoriteStop;
    //   const favoriteStops = state.favoriteStops.map((f) =>
    //     f.id === favoriteStop.id ? favoriteStop : f
    //   );
    //   return {
    //     ...state,
    //     favoriteStops,
    //   };
    // }),

    // on(favoriteStopsActions.clearFavoriteStops, (state) => {
    //   const favoriteStops = [] as FavoriteStop[];
    //   return {
    //     ...state,
    //     favoriteStops: favoriteStops,
    //   };
    // })
  ),
});
