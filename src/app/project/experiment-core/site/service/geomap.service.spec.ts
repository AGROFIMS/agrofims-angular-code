import { TestBed } from '@angular/core/testing';

import { GeomapService } from './geomap.service';

describe('GeomapService', () => {
  let service: GeomapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeomapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
