import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'nd-play2a-small',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play2a-small.component.html',
  styleUrls: ['./play2a-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Play2SmallComponent {
  @Input() aText: string;
  @Output() aTextClicked = new EventEmitter<void>();

  constructor() {
    this.aText = '';
  }

  clickText() {
    console.log('play2a-small clicked');

    this.aTextClicked.emit();
  }
}
