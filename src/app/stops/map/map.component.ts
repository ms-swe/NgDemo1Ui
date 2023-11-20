import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { stopsFacade } from '../data/stops.facade';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'nd-map',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  private facade = inject(stopsFacade);

  favoriteStops = this.facade.favoriteStops;
  loading = this.facade.loadingFavoriteStops;

  displayedColumns: string[] = ['haltestellenname'];

  dataSource = new MatTableDataSource<FavoriteStop>([]);

  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }

  constructor(private dialog: MatDialog) {
    this.facade.loadFavoriteStops();

    effect(() => {
      this.dataSource.data = this.favoriteStops();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
