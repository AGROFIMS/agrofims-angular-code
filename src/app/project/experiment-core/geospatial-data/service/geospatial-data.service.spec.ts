import { TestBed } from '@angular/core/testing';

import { GeospatialDataService } from './geospatial-data.service';

describe('GeospatialDataService', () => {
  let service: GeospatialDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeospatialDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
