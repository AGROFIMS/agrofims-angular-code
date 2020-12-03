import { TestBed } from '@angular/core/testing';

import { FactorService } from './factor.service';

describe('FactorService', () => {
  let service: FactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
