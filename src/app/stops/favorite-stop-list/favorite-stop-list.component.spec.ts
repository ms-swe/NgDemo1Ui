import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { FavoriteStopListComponent } from './favorite-stop-list.component';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { Signal, signal } from '@angular/core';
import { stopsFacade } from '../data/stops.facade';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('FavoriteStopListComponent', () => {
  let component: FavoriteStopListComponent;
  let fixture: ComponentFixture<FavoriteStopListComponent>;
  let loader: HarnessLoader;

  let stopsFacadeMock: {
    favoriteStops: Signal<FavoriteStop[]>;
    loadingFavoriteStops: Signal<boolean>;
    loadFavoriteStops: () => Promise<void>;
    deleteFavoriteStop: (vgnKennung: number) => void;
  };

  const expectedStops: FavoriteStop[] = [
    {
      id: 1,
      haltestellenname: 'Bahnhof',
      vgnKennung: 987,
      longitude: 12.34,
      latitude: 5.678,
      produkte: 'Bus, U-Bahn',
    },
    {
      id: 2,
      haltestellenname: 'Burg',
      vgnKennung: 988,
      longitude: 15.55,
      latitude: 1.11,
      produkte: 'Bus',
    },
  ];

  beforeEach(async () => {
    stopsFacadeMock = {
      favoriteStops: signal(expectedStops),
      loadingFavoriteStops: signal(false),
      loadFavoriteStops: () => {
        return Promise.resolve();
      },
      deleteFavoriteStop: (vgnKennung) => {
        return;
      },
    };

    spyOn(stopsFacadeMock, 'loadFavoriteStops').and.callThrough();
    spyOn(stopsFacadeMock, 'deleteFavoriteStop').and.callThrough();

    await TestBed.configureTestingModule({
      imports: [FavoriteStopListComponent],
      providers: [
        { provide: stopsFacade, useValue: stopsFacadeMock },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteStopListComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the favorite stops from the facade', () => {
    expect(stopsFacadeMock.loadFavoriteStops).toHaveBeenCalledOnceWith();
  });

  it('should display a table of favorite stops', async () => {
    const table = await loader.getHarness(MatTableHarness);

    const rows = table.getRows();
    expect(rows).toHaveSize(2);

    const texts = await table.getCellTextByIndex();

    expect(texts[0][0]).toBe('Bahnhof');
    expect(texts[0][1]).toBe('987');
    expect(texts[0][2]).toContain('Longitude: 12.340');

    expect(texts[1][0]).toBe('Burg');
    expect(texts[1][1]).toBe('988');
    expect(texts[1][2]).toContain('/ Latitude: 1.110');
  });

  // it('should call the facade when the delete button is clicked', async () => {});
});
