import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPhenologyEditComponent } from './crop-phenology-edit.component';

describe('CropPhenologyEditComponent', () => {
  let component: CropPhenologyEditComponent;
  let fixture: ComponentFixture<CropPhenologyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPhenologyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPhenologyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
