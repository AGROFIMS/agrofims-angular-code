import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropMeasurementTabListComponent } from './crop-measurement-tab-list.component';

describe('CropMeasurementTabListComponent', () => {
  let component: CropMeasurementTabListComponent;
  let fixture: ComponentFixture<CropMeasurementTabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropMeasurementTabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropMeasurementTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
