import { TestBed } from '@angular/core/testing';

import { SiteDesignService } from './site-design.service';

describe('SiteDesignService', () => {
  let service: SiteDesignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteDesignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
