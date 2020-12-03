import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropSoilTabListComponent } from './crop-soil-tab-list.component';

describe('CropSoilTabListComponent', () => {
  let component: CropSoilTabListComponent;
  let fixture: ComponentFixture<CropSoilTabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropSoilTabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropSoilTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
