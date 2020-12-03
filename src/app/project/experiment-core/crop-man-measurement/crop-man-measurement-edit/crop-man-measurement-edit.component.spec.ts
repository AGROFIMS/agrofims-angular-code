import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManMeasurementEditComponent } from './crop-man-measurement-edit.component';

describe('CropManMeasurementEditComponent', () => {
  let component: CropManMeasurementEditComponent;
  let fixture: ComponentFixture<CropManMeasurementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropManMeasurementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropManMeasurementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
