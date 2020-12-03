import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropFertilizerListComponent } from './crop-fertilizer-list.component';

describe('CropFertilizerListComponent', () => {
  let component: CropFertilizerListComponent;
  let fixture: ComponentFixture<CropFertilizerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropFertilizerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFertilizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
