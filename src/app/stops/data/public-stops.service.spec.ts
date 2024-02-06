import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PublicStopsService } from './public-stops.service';
import { PublicStop } from 'src/app/data-model/publicStop';

describe('PublicStopsService', () => {
  let service: PublicStopsService;
  let httpMock: HttpTestingController;

  const expectedStops: PublicStop[] = [
    {
      Haltestellenname: 'Bahnhof',
      VGNKennung: 987,
      VAGKennung: '654',
      Longitude: 12.34,
      Latitude: 5.678,
      Produkte: 'Bus, U-Bahn',
    },
  ];

  const expectedAnswer = { Haltestellen: expectedStops };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PublicStopsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of public stops', () => {
    let receivedStops!: PublicStop[];

    service
      .getByName('EinName')
      .subscribe((result) => (receivedStops = result));

    const req = httpMock.expectOne(
      'https://start.vag.de/dm/api/v1/haltestellen.json/vgn?name=EinName'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(expectedAnswer);

    expect(receivedStops).toHaveSize(1);
    expect(receivedStops[0].Haltestellenname).toBe('Bahnhof');
  });

  it('should return an empty list in case of error', () => {
    let receivedStops!: PublicStop[];

    service
      .getByName('EinName')
      .subscribe((result) => (receivedStops = result));

    const req = httpMock.expectOne(
      'https://start.vag.de/dm/api/v1/haltestellen.json/vgn?name=EinName'
    );
    expect(req.request.method).toEqual('GET');

    req.flush('Fehler...', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    expect(receivedStops).toHaveSize(0);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
