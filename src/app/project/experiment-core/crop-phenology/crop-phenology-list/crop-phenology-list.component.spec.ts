import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPhenologyListComponent } from './crop-phenology-list.component';

describe('CropPhenologyListComponent', () => {
  let component: CropPhenologyListComponent;
  let fixture: ComponentFixture<CropPhenologyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPhenologyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPhenologyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
