import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteStopsFacade } from '../data/favorite-stops.facade';

@Component({
  selector: 'nd-favorite-stop-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-stop-list.component.html',
  styleUrls: ['./favorite-stop-list.component.scss'],
})
export class FavoriteStopListComponent {
  private facade = inject(FavoriteStopsFacade);

  favoriteStops = this.facade.favoriteStops;
  loading = this.facade.favoriteStopsLoading;

  constructor() {
    this.facade.load();
  }
}
