import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { Observable, of } from 'rxjs';
import { FavoriteStopsService } from '../data/favoriteStops.service';

@Component({
  selector: 'nd-favorite-stop-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-stop-list.component.html',
  styleUrls: ['./favorite-stop-list.component.scss'],
})
export class FavoriteStopListComponent {
  favoriteStops$: Observable<FavoriteStop[]>;

  constructor(private favoriteStopsService: FavoriteStopsService) {
    this.favoriteStops$ = favoriteStopsService.getAll();
  }
}
