import { TestBed } from '@angular/core/testing';

import { SiteCropService } from './site-crop.service';

describe('SiteCropService', () => {
  let service: SiteCropService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteCropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
