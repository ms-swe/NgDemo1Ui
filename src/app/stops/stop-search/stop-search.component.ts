import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { StopListComponent } from '../stop-list/stop-list.component';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { StopsService } from '../data/stops.service';
import { Observable, of } from 'rxjs';
import { Stop } from 'src/app/data-model/stop';
import { stopSearchCriteriaCorrect } from 'src/app/shared/validators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'nd-stop-search',
  templateUrl: './stop-search.component.html',
  styleUrls: ['./stop-search.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    StopListComponent,
    FormErrorsComponent,
    JsonPipe,
  ],
})
export class StopSearchComponent {
  stops$: Observable<Stop[]>;

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

  constructor(private service: StopsService) {
    this.stops$ = of([]);
  }

  submitForm() {
    const formValue = this.form.getRawValue();

    if (formValue.criteria.name) {
      this.stops$ = this.service.getByName(formValue.criteria.name);
    } else {
      this.stops$ = this.service.getByLocation(
        formValue.criteria.lon,
        formValue.criteria.lat,
        formValue.criteria.radius
      );
    }
  }
}
