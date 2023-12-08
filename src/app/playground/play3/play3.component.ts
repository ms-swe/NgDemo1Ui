import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nd-play3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play3.component.html',
  styleUrl: './play3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Play3Component {}
