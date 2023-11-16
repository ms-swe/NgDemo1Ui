import {
  AfterViewInit,
  Component,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { stopsFacade } from '../data/stops.facade';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { interval, take } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteFavoriteDialogComponent } from './delete-favorite-dialog/delete-favorite-dialog.component';

@Component({
  selector: 'nd-favorite-stop-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './favorite-stop-list.component.html',
  styleUrls: ['./favorite-stop-list.component.scss'],
})
export class FavoriteStopListComponent {
  private facade = inject(stopsFacade);

  favoriteStops = this.facade.favoriteStops;
  loading = this.facade.loadingFavoriteStops;

  displayedColumns: string[] = ['haltestellenname', 'vgnKennung', 'delete'];

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

  deleteFavoriteStop(row: FavoriteStop) {
    const dialogRef = this.dialog.open(DeleteFavoriteDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { haltestellenname: row.haltestellenname },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.facade.deleteFavoriteStop(row.vgnKennung);
      }
    });
  }
}
