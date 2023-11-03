import { Injectable, inject } from '@angular/core';
import { FavoriteStopsService } from '../../favorite-stops.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { favoriteStopsActions } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoriteStopsEffects {
  favoriteStopsService = inject(FavoriteStopsService);
  actions$ = inject(Actions);

  // prettier-ignore
  loadFavoriteStops = createEffect(() =>
    this.actions$.pipe(                                               // actions$ is the observable of all actions in the store
      ofType(favoriteStopsActions.loadFavoriteStops),                 // the effect shall react on this action type only
      switchMap((a) => this.favoriteStopsService.getAll()),           // applicable flattening operator
      map((favoriteStops) =>                                          // the result of getAll() ...
        favoriteStopsActions.favoriteStopsLoaded({ favoriteStops })   // ... is packed into a new action, see actions.ts
      )
    )
  );
}
