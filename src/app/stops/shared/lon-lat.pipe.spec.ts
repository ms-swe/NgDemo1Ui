import { LonLatPipe } from './lon-lat.pipe';

describe('LonLatPipe', () => {
  let pipe: LonLatPipe;

  beforeEach(() => {
    pipe = new LonLatPipe();
  });

  it('should format a lon/lat value correctly', () => {
    expect(pipe.transform([1.2349, 9.8])).toBe(
      'Longitude: 1.235 / Latitude: 9.800'
    );
  });
});
