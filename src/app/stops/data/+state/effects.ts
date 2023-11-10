import { Injectable, inject } from '@angular/core';
import { FavoriteStopsService } from '../favorite-stops.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { stopsActions } from './actions';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';
import { PublicStopsService } from '../public-stops.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class stopsEffects {
  favoriteStopsService = inject(FavoriteStopsService);
  publicStopsService = inject(PublicStopsService);
  actions$ = inject(Actions);
  snackBar = inject(MatSnackBar);

  // prettier-ignore
  loadPublicStopsByName = createEffect(() =>
    this.actions$.pipe(                                             // actions$ is the observable of all actions in the store
      ofType(stopsActions.loadPublicStopsByName),                   // the effect shall react on this action type only
      switchMap((a) => this.publicStopsService.getByName(a.name)),  // applicable flattening operator
      map((publicStops                                              // the result of getXxx() ...
        ) => stopsActions.publicStopsLoaded({ publicStops })        // ... is packed into a new action, see actions.ts
      )
    )
  );

  loadPublicStopsByLocation = createEffect(() =>
    this.actions$.pipe(
      ofType(stopsActions.loadPublicStopsByLocation),
      switchMap((a) =>
        this.publicStopsService.getByLocation(a.lon, a.lat, a.radius)
      ),
      map((publicStops) => stopsActions.publicStopsLoaded({ publicStops }))
    )
  );

  loadFavoriteStops = createEffect(() =>
    this.actions$.pipe(
      ofType(stopsActions.loadFavoriteStops),
      switchMap((a) => this.favoriteStopsService.getAll()),
      map((favoriteStops) =>
        stopsActions.favoriteStopsLoaded({ favoriteStops })
      )
    )
  );

  createFavoriteStop = createEffect(() =>
    this.actions$.pipe(
      ofType(stopsActions.createFavoriteStop),
      concatMap((a) => this.favoriteStopsService.create(a.favoriteStop)),
      map((favoriteStop) => stopsActions.favoriteStopCreated({ favoriteStop })),
      catchError(() =>
        of(
          stopsActions.communicationErrorFavoriteStops({
            message: 'Der Favorit konnte nicht gesetzt werden.',
          })
        )
      )
    )
  );

  deleteFavoriteStop = createEffect(() =>
    this.actions$.pipe(
      ofType(stopsActions.deleteFavoriteStop),
      concatMap((action) =>
        this.favoriteStopsService.delete(action.favoriteStopId).pipe(
          map(() =>
            stopsActions.favoriteStopDeleted({
              favoriteStopId: action.favoriteStopId,
            })
          ),
          catchError(() =>
            of(
              stopsActions.communicationErrorFavoriteStops({
                message: 'Der Favorit konnte nicht entfernt werden.',
              })
            )
          )
        )
      )
    )
  );

  communicationErrorFavoriteStops = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(stopsActions.communicationErrorFavoriteStops),
        map((action) => {
          this.snackBar.open(action.message, 'Schließen', {
            duration: 3000,
          });
        })
      );
    },
    { dispatch: false }
  );
}
