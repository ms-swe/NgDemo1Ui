import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { StopListComponent } from '../stop-list/stop-list.component';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { StopsService } from '../data/stops.service';
import { Observable, of } from 'rxjs';
import { Stop } from 'src/app/data-model/stop';
import { stopSearchCriteriaCorrect } from 'src/app/shared/validators';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FavoriteStopsService } from '../data/favorite-stops.service';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';

@Component({
  selector: 'nd-stop-search',
  templateUrl: './stop-search.component.html',
  styleUrls: ['./stop-search.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StopListComponent,
    FormErrorsComponent,
    JsonPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class StopSearchComponent {
  stops$: Observable<Stop[]>;
  favoriteStops$: Observable<FavoriteStop[]>;

  form = new FormGroup({
    criteria: new FormGroup(
      {
        name: new FormControl('', { nonNullable: true }),
        lon: new FormControl('', { nonNullable: true }),
        lat: new FormControl('', { nonNullable: true }),
        radius: new FormControl('', { nonNullable: true }),
      },
      { validators: stopSearchCriteriaCorrect }
    ),
  });

  constructor(
    private stopsService: StopsService,
    private favoriteStopsService: FavoriteStopsService
  ) {
    this.stops$ = of([]);
    this.favoriteStops$ = of([]);
  }

  submitForm() {
    const formValue = this.form.getRawValue();

    if (formValue.criteria.name) {
      this.stops$ = this.stopsService.getByName(formValue.criteria.name);
    } else {
      this.stops$ = this.stopsService.getByLocation(
        formValue.criteria.lon,
        formValue.criteria.lat,
        formValue.criteria.radius
      );
    }

    this.stops$.subscribe({
      next: (value) => this.getAndAddStopFavoriteInfo(value),
      error: (err) => console.error('error in stops subscription'),
      complete: () => console.log('stops subscription completed'),
    });
  }

  private getAndAddStopFavoriteInfo(stops: Stop[]) {
    this.favoriteStops$ = this.favoriteStopsService.getAll();

    this.favoriteStops$.subscribe({
      next: (value) => this.addStopFavoriteInfo(stops, value),
      error: (err) => console.error('error in favoriteStops subscription'),
      complete: () => console.log('favoriteStops subscription completed'),
    });
  }

  private addStopFavoriteInfo(stops: Stop[], favoriteStops: FavoriteStop[]) {
    stops.forEach((s) => {
      console.log('set s.FavoriteStop for ' + s.Haltestellenname);
      s.FavoriteStop = favoriteStops.find(
        (fs) => fs.vgnKennung == s.VGNKennung
      );
      console.log('done: s.FavoriteStop is now ' + s.FavoriteStop?.vgnKennung);
    });

    this.stops$ = of(stops);
  }
}
