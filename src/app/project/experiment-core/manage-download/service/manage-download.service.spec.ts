import { TestBed } from '@angular/core/testing';

import { ManageDownloadService } from './manage-download.service';

describe('ManageDownloadService', () => {
  let service: ManageDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
