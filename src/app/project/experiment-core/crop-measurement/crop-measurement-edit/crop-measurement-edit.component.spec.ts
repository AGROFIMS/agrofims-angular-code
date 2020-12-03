import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropMeasurementEditComponent } from './crop-measurement-edit.component';

describe('CropMeasurementEditComponent', () => {
  let component: CropMeasurementEditComponent;
  let fixture: ComponentFixture<CropMeasurementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropMeasurementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropMeasurementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
