import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManMeasurementListComponent } from './crop-man-measurement-list.component';

describe('CropManMeasurementListComponent', () => {
  let component: CropManMeasurementListComponent;
  let fixture: ComponentFixture<CropManMeasurementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropManMeasurementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropManMeasurementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
