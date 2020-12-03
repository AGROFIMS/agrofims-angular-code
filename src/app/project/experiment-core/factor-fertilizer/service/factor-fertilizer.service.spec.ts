import { TestBed } from '@angular/core/testing';

import { FactorFertilizerService } from './factor-fertilizer.service';

describe('FactorFertilizerService', () => {
  let service: FactorFertilizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorFertilizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
