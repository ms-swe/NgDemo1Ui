import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  effect,
  inject,
  signal,
} from '@angular/core';
import { stopsFacade } from '../data/stops.facade';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { AngularSplitModule } from 'angular-split';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { PublicStopListItemComponent } from '../public-stop-list-item/public-stop-list-item.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'nd-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSortModule,
    MatSlideToggleModule,
    AngularSplitModule,
    CdkDropList,
    CdkDrag,
    MatIconModule,
    PublicStopListItemComponent,
  ],
})
export class MapComponent {
  private facade = inject(stopsFacade);

  favoriteStops = this.facade.favoriteStops;
  loadingFavoriteStops = this.facade.loadingFavoriteStops;

  displayedColumns: string[] = ['haltestellenname'];

  dataSourceFavorites = new MatTableDataSource<FavoriteStop>([]);

  dataSourceSelected = signal([] as FavoriteStop[]);

  private sort!: MatSort;

  private mouseOverVgnKennung = new Set<number>();

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSourceFavorites.sort = this.sort;
  }

  currentDate = new Date();

  private selectedStopsRef!: QueryList<ElementRef>;
  @ViewChildren('mapDivSelectedStop') set setMapDivSelectedStop(
    mapDivSelectedStop: QueryList<ElementRef>
  ) {
    this.selectedStopsRef = mapDivSelectedStop;
    this.updateSelectedStopsInMap();
  }

  constructor(private renderer: Renderer2) {
    this.facade.loadFavoriteStops();

    effect(() => {
      this.dataSourceFavorites.data = this.favoriteStops();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFavorites.filter = filterValue.trim().toLowerCase();
  }

  intoSelectedStopsPredicate(item: CdkDrag<FavoriteStop>) {
    return true;
  }

  intoFavoriteStopsPredicate(item: CdkDrag<FavoriteStop>) {
    return true;
  }

  dropIntoSelected(event: CdkDragDrop<FavoriteStop>) {
    if (event.previousContainer === event.container) {
      //delete
      this.dataSourceSelected.update((value) =>
        value
          .slice(0, event.previousIndex)
          .concat(value.slice(event.previousIndex + 1))
      );

      //insert
      this.dataSourceSelected.update((value) =>
        value
          .slice(0, event.currentIndex)
          .concat([event.item.data])
          .concat(value.slice(event.currentIndex))
      );
    } else {
      //delete in other table (real index in array maybe different because of sorting capability)
      const favoritesIndexInArray = this.dataSourceFavorites.data.findIndex(
        (val) => val.vgnKennung == event.item.data.vgnKennung
      );
      this.dataSourceFavorites.data = this.dataSourceFavorites.data
        .slice(0, favoritesIndexInArray)
        .concat(this.dataSourceFavorites.data.slice(favoritesIndexInArray + 1));

      //insert here
      this.dataSourceSelected.update((value) =>
        value
          .slice(0, event.currentIndex)
          .concat([event.item.data])
          .concat(value.slice(event.currentIndex))
      );
    }
  }

  dropIntoFavorites(event: CdkDragDrop<FavoriteStop>) {
    if (event.previousContainer === event.container) {
      // no d&d inside favorites table
    } else {
      //delete in other table
      this.dataSourceSelected.update((value) =>
        value
          .slice(0, event.previousIndex)
          .concat(value.slice(event.previousIndex + 1))
      );

      //insert here at the end
      this.dataSourceFavorites.data = this.dataSourceFavorites.data.concat([
        event.item.data,
      ]);
    }
  }

  updateSelectedStopsInMap() {
    const mapDivStopOffsetHorzPercent = -1;
    const mapDivStopOffsetVertPercent = 1;

    const mapMinLon = 11.024; // west
    const mapMaxLon = 11.138; // east
    const mapMinLat = 49.475; // north
    const mapMaxLat = 49.421; // south

    this.selectedStopsRef.toArray().forEach((selectedStopRef) => {
      const correspondingfavoriteStop = this.dataSourceSelected().find(
        (val) =>
          'vgnKennung-' + val.vgnKennung == selectedStopRef.nativeElement.id
      );
      if (correspondingfavoriteStop) {
        let xPercent =
          (100 * (correspondingfavoriteStop.longitude! - mapMinLon)) /
          (mapMaxLon - mapMinLon);

        let yPercent =
          (100 * (correspondingfavoriteStop.latitude! - mapMinLat)) /
          (mapMaxLat - mapMinLat);

        console.log('lonStop', correspondingfavoriteStop.longitude);
        console.log('lonMin', mapMinLon);
        console.log('lonMax', mapMaxLon);
        console.log('xPercent=', xPercent);

        console.log('latStop', correspondingfavoriteStop.latitude);
        console.log('latMin', mapMinLat);
        console.log('latMax', mapMaxLat);
        console.log('yPercent=', yPercent);

        this.renderer.setStyle(
          selectedStopRef.nativeElement,
          'left',
          `calc(${xPercent}% + ${mapDivStopOffsetHorzPercent}%)`
        );

        this.renderer.setStyle(
          selectedStopRef.nativeElement,
          'top',
          `calc(${yPercent}% + ${mapDivStopOffsetVertPercent}%)`
        );
      }
    });
  }

  registerMouseOver(vgnKennung: number) {
    this.mouseOverVgnKennung.add(vgnKennung);
  }
  registerMouseLeave(vgnKennung: number) {
    this.mouseOverVgnKennung.delete(vgnKennung);
  }

  isMouseOverSelectedStop(vgnKennung: number): boolean {
    return this.mouseOverVgnKennung.has(vgnKennung);
  }
}
