import { TestBed } from '@angular/core/testing';

import { SiteFactorService } from './site-factor.service';

describe('SiteFactorService', () => {
  let service: SiteFactorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteFactorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
