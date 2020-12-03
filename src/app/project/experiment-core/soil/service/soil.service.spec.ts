import { TestBed } from '@angular/core/testing';

import { SoilService } from './soil.service';

describe('SoilService', () => {
  let service: SoilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
