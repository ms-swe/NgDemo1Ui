import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Play1Component } from '../play1/play1.component';
import { Play3Component } from '../play3/play3.component';

@Component({
  selector: 'nd-play0-tab',
  standalone: true,
  templateUrl: './play0-tab.component.html',
  styleUrl: './play0-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTabsModule, Play1Component, Play3Component],
})
export class Play0TabComponent {}
