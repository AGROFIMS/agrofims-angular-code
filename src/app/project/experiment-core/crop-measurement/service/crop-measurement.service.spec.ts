import { TestBed } from '@angular/core/testing';

import { CropMeasurementService } from './crop-measurement.service';

describe('CropMeasurementService', () => {
  let service: CropMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
