import { TestBed } from '@angular/core/testing';

import { PublicStopsService } from './public-stops.service';

describe('PublicStopsService', () => {
  let service: PublicStopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
