import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropFertilizerEditComponent } from './crop-fertilizer-edit.component';

describe('CropFertilizerEditComponent', () => {
  let component: CropFertilizerEditComponent;
  let fixture: ComponentFixture<CropFertilizerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropFertilizerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFertilizerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
