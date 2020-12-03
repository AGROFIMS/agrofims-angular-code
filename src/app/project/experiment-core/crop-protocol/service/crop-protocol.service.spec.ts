import { TestBed } from '@angular/core/testing';

import { CropProtocolService } from './crop-protocol.service';

describe('CropProtocolService', () => {
  let service: CropProtocolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropProtocolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
