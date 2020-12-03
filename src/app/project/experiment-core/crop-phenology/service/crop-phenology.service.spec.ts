import { TestBed } from '@angular/core/testing';

import { CropPhenologyService } from './crop-phenology.service';

describe('CropPhenologyService', () => {
  let service: CropPhenologyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropPhenologyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
