import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropSoilListComponent } from './crop-soil-list.component';

describe('CropSoilListComponent', () => {
  let component: CropSoilListComponent;
  let fixture: ComponentFixture<CropSoilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropSoilListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropSoilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
