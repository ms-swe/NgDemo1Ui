import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stopsFacade } from '../data/stops.facade';

@Component({
  selector: 'nd-favorite-stop-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-stop-list.component.html',
  styleUrls: ['./favorite-stop-list.component.scss'],
})
export class FavoriteStopListComponent {
  private facade = inject(stopsFacade);

  favoriteStops = this.facade.favoriteStops;
  loading = this.facade.loadingFavoriteStops;

  constructor() {
    this.facade.loadFavoriteStops();
  }
}
