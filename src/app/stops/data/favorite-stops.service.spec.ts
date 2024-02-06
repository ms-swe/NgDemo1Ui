import { TestBed } from '@angular/core/testing';

import { FavoriteStopsService } from './favorite-stops.service';
import { FavoriteStop } from 'src/app/data-model/favoriteStop';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('FavoriteStopsService', () => {
  let service: FavoriteStopsService;
  let httpMock: { get: (url: string) => Observable<FavoriteStop[]> };

  beforeEach(() => {
    const expectedStops: FavoriteStop[] = [
      {
        id: 1,
        haltestellenname: 'Bahnhof',
        vgnKennung: 987,
        longitude: 12.34,
        latitude: 5.678,
        produkte: 'Bus, U-Bahn',
      },
    ];

    httpMock = { get: () => of(expectedStops) };

    spyOn(httpMock, 'get').and.callThrough();

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpMock }],
    });

    service = TestBed.inject(FavoriteStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of favorite stops', () => {
    let receivedStops!: FavoriteStop[];

    service.getAll().subscribe((result) => (receivedStops = result));

    expect(receivedStops).toHaveSize(1);
    expect(receivedStops[0].haltestellenname).toBe('Bahnhof');
  });
});
