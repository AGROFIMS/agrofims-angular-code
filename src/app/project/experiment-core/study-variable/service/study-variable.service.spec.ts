import { TestBed } from '@angular/core/testing';

import { StudyVariableService } from './study-variable.service';

describe('StudyVariableService', () => {
  let service: StudyVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudyVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
