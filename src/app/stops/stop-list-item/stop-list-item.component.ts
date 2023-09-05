import { Component, Input } from '@angular/core';
import { Stop } from 'src/app/data-model/stop';

@Component({
  selector: 'nd-stop-list-item',
  templateUrl: './stop-list-item.component.html',
  styleUrls: ['./stop-list-item.component.css'],
})
export class StopListItemComponent {
  @Input() stop?: Stop;
}
