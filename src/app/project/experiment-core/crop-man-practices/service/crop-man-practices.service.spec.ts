import { TestBed } from '@angular/core/testing';

import { CropManPracticesService } from './crop-man-practices.service';

describe('CropManPracticesService', () => {
  let service: CropManPracticesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropManPracticesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
