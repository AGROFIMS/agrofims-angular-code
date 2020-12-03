import { TestBed } from '@angular/core/testing';

import { CropManMeasurementService } from './crop-man-measurement.service';

describe('CropManMeasurementService', () => {
  let service: CropManMeasurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropManMeasurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
