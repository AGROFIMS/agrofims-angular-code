import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPhenologyTabListComponent } from './crop-phenology-tab-list.component';

describe('CropPhenologyTabListComponent', () => {
  let component: CropPhenologyTabListComponent;
  let fixture: ComponentFixture<CropPhenologyTabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPhenologyTabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPhenologyTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
