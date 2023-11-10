import { Component, Signal, computed, inject } from '@angular/core';
import { PublicStopListItemComponent } from '../public-stop-list-item/public-stop-list-item.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { stopsFacade } from '../data/stops.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'nd-public-stop-list',
  templateUrl: './public-stop-list.component.html',
  styleUrls: ['./public-stop-list.component.scss'],
  standalone: true,
  imports: [PublicStopListItemComponent, NgIf, NgFor, AsyncPipe],
})
export class PublicStopListComponent {
  private facade = inject(stopsFacade);

  publicStops = this.facade.publicStops;
  loading = computed(
    () => this.facade.loadingFavoriteStops() || this.facade.loadingPublicStops()
  );

  constructor(private snackBar: MatSnackBar) {
    this.facade.loadFavoriteStops();
  }

  isFavorite(vgnKennung: number): Signal<boolean> {
    return this.facade.isFavoriteStop(vgnKennung);
  }

  changeFavorite(
    vgnKennung: number,
    haltestellenname: string,
    checkedAsFavorite: boolean
  ) {
    if (checkedAsFavorite) {
      this.facade.createFavoriteStop(vgnKennung, haltestellenname);
    } else {
      this.facade.deleteFavoriteStop(vgnKennung);
    }
  }
}
