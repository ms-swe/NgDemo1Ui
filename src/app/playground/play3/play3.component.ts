import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'nd-play3',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './play3.component.html',
  styleUrl: './play3.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Play3Component {}
