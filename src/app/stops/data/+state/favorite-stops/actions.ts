import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';

export const favoriteStopsActions = createActionGroup({
  source: 'favoriteStops',
  events: {
    'load favorite stops': emptyProps(), // example for search params: props<{ criterion1: string; criterion1: number }>(),
    'favorite stops loaded': props<{ favoriteStops: FavoriteStop[] }>(),
    // 'update favorite stop': props<{ favoriteStop: FavoriteStop }>(),
    // 'clear favorite stops': emptyProps(),
  },
});
