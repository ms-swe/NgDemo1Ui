import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'nd-play2-small',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play2-small.component.html',
  styleUrls: ['./play2-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Play2SmallComponent {
  @Input() aText: string;
  @Output() aTextClicked = new EventEmitter<void>();

  constructor() {
    this.aText = '';
  }

  clickText() {
    console.log('play2-small clicked');

    this.aTextClicked.emit();
  }
}
