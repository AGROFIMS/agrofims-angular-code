import { TestBed } from '@angular/core/testing';

import { SiteFileService } from './site-file.service';

describe('SiteFileService', () => {
  let service: SiteFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
