import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropFertilizerEditRowComponent } from './crop-fertilizer-edit-row.component';

describe('CropFertilizerEditRowComponent', () => {
  let component: CropFertilizerEditRowComponent;
  let fixture: ComponentFixture<CropFertilizerEditRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropFertilizerEditRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFertilizerEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
