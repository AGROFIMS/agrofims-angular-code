import { TestBed } from '@angular/core/testing';

import { ExpSiteService } from './exp-site.service';

describe('ExpSiteService', () => {
  let service: ExpSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
