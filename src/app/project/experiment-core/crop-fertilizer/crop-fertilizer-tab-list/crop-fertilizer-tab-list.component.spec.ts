import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropFertilizerTabListComponent } from './crop-fertilizer-tab-list.component';

describe('CropFertilizerTabListComponent', () => {
  let component: CropFertilizerTabListComponent;
  let fixture: ComponentFixture<CropFertilizerTabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropFertilizerTabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropFertilizerTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
