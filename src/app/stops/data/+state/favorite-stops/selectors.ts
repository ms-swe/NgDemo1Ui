import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteStopsState, favoriteStopsFeatureKey } from './reducers';

export const selectFavoriteStopsState =
  createFeatureSelector<FavoriteStopsState>(favoriteStopsFeatureKey);

export const selectFavoriteStopsLoading = createSelector(
  selectFavoriteStopsState,
  (state) => state.loading
);
