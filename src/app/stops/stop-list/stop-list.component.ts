import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stop } from 'src/app/data-model/stop';
import { StopListItemComponent } from '../stop-list-item/stop-list-item.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'nd-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss'],
  standalone: true,
  imports: [StopListItemComponent, NgIf, NgFor, AsyncPipe],
})
export class StopListComponent {
  @Input() stops$: Observable<Stop[]>;

  constructor() {
    this.stops$ = of([]);
  }
}
