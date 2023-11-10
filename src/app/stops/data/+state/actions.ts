import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { PublicStop } from 'src/app/data-model/publicStop';

export const stopsActions = createActionGroup({
  source: 'stops',
  events: {
    'load public stops by name': props<{ name: string }>(),
    'load public stops by location': props<{
      lon: string;
      lat: string;
      radius: string;
    }>(),
    'public stops loaded': props<{ publicStops: PublicStop[] }>(),

    'load favorite stops': emptyProps(),
    'favorite stops loaded': props<{ favoriteStops: FavoriteStop[] }>(),

    'create favorite stop': props<{ favoriteStop: FavoriteStop }>(),
    'favorite stop created': props<{ favoriteStop: FavoriteStop }>(),

    'delete favorite stop': props<{ favoriteStopId: number }>(),
    'favorite stop deleted': props<{ favoriteStopId: number }>(),

    'communication error favorite stops': props<{ message: string }>(),
  },
});
