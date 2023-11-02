import { Component, Input } from '@angular/core';
import { Stop } from 'src/app/data-model/stop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { NgIf, NgFor } from '@angular/common';
import { FavoriteStopsService } from '../data/favoriteStops.service';

@Component({
  selector: 'nd-stop-list-item',
  templateUrl: './stop-list-item.component.html',
  styleUrls: ['./stop-list-item.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
})
export class StopListItemComponent {
  @Input() stop?: Stop;

  constructor(
    private favoriteStopsService: FavoriteStopsService,
    private snackBar: MatSnackBar
  ) {}

  changeFavorite(event: MatSlideToggleChange) {
    let favoriteStop = this.stop?.FavoriteStop;

    if (event.checked) {
      if (!favoriteStop) {
        favoriteStop = {
          id: -1,
          haltestellenname: this.stop?.Haltestellenname ?? '',
          vgnKennung: this.stop?.VGNKennung ?? -1,
        };
      }

      this.favoriteStopsService.upsert(favoriteStop).subscribe({
        next: (value) => {
          console.log(
            'favoriteStopsService.upsert next: ' + JSON.stringify(value)
          );
          this.stop!.FavoriteStop = value;
        },
        error: (err) => {
          console.error(
            'favoriteStopsService.upsert with error: ' + JSON.stringify(err)
          );

          // reset slide toggle to previous value
          event.source.checked = false;

          this.snackBar.open(
            'Favorit konnte nicht gesetzt werden',
            'Schließen',
            {
              duration: 3000,
            }
          );
        },
        complete: () => console.log('favoriteStopsService.upsert completed'),
      });
    } else if (favoriteStop) {
      this.favoriteStopsService.delete(favoriteStop).subscribe({
        next: (value) => {
          console.log(
            'favoriteStopsService.delete next: ' + JSON.stringify(value)
          );
          this.stop!.FavoriteStop = undefined;
        },
        error: (err) => {
          console.error(
            'favoriteStopsService.delete with error: ' + JSON.stringify(err)
          );

          // reset slide toggle to previous value
          event.source.checked = true;

          this.snackBar.open(
            'Favorit konnte nicht entfernt werden',
            'Schließen',
            { duration: 3000 }
          );
        },
        complete: () => console.log('favoriteStopsService.delete completed'),
      });
    }
  }
}
