import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropMeasurementListComponent } from './crop-measurement-list.component';

describe('CropMeasurementListComponent', () => {
  let component: CropMeasurementListComponent;
  let fixture: ComponentFixture<CropMeasurementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropMeasurementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropMeasurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
