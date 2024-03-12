import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicStopListItemComponent } from '../public-stop-list-item/public-stop-list-item.component';
import { PublicStop } from 'src/app/data-model/publicStop';
import { stopsFacade } from '../data/stops.facade';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nd-public-stop',
  standalone: true,
  imports: [CommonModule, PublicStopListItemComponent],
  templateUrl: './public-stop.component.html',
  styleUrl: './public-stop.component.scss',
})
export class PublicStopComponent {
  route = inject(ActivatedRoute);
  private facade = inject(stopsFacade);

  name: string = '';

  publicStops = this.facade.publicStops;

  publicStop = computed(() => {
    return this.publicStops() ? this.publicStops()[0] : undefined;
  });

  loading = computed(
    () => this.facade.loadingFavoriteStops() || this.facade.loadingPublicStops()
  );

  constructor() {
    this.name = this.route.snapshot.paramMap.get('name')!;

    this.facade.loadPublicStopsByName(this.name);
  }

  isFavorite(vgnKennung: number): Signal<boolean> {
    return this.facade.isFavoriteStop(vgnKennung);
  }
}
