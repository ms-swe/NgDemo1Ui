import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stop } from 'src/app/data-model/stop';
import { StopsService } from 'src/app/stops/data/stops.service';

@Component({
  selector: 'nd-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.css'],
})
export class StopListComponent {
  stops$: Observable<Stop[]>;

  constructor(private service: StopsService) {
    this.stops$ = of([]);
  }

  searchStops(name: string) {
    this.stops$ = this.service.getByName(name);
  }
}
