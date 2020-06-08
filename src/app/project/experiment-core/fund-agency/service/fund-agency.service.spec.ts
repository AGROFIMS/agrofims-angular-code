import { TestBed } from '@angular/core/testing';

import { FundAgencyService } from './fund-agency.service';

describe('FundAgencyService', () => {
  let service: FundAgencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundAgencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
