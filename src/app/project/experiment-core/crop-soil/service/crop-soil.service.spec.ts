import { TestBed } from '@angular/core/testing';

import { CropSoilService } from './crop-soil.service';

describe('CropSoilService', () => {
  let service: CropSoilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropSoilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
