import { TestBed } from '@angular/core/testing';

import { CropFertilizerService } from './crop-fertilizer.service';

describe('CropFertilizerService', () => {
  let service: CropFertilizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropFertilizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
