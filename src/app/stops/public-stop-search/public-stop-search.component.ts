import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PublicStopListComponent } from '../public-stop-list/public-stop-list.component';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { stopSearchCriteriaCorrect } from 'src/app/shared/validators';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { stopsFacade } from '../data/stops.facade';

@Component({
  selector: 'public-nd-stop-search',
  templateUrl: './public-stop-search.component.html',
  styleUrls: ['./public-stop-search.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PublicStopListComponent,
    FormErrorsComponent,
    JsonPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class PublicStopSearchComponent {
  private facade = inject(stopsFacade);

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

  submitForm() {
    const formValue = this.form.getRawValue();

    if (formValue.criteria.name) {
      this.facade.loadPublicStopsByName(formValue.criteria.name);
    } else {
      this.facade.loadPublicStopsByLocation(
        formValue.criteria.lon,
        formValue.criteria.lat,
        formValue.criteria.radius
      );
    }
  }
}
