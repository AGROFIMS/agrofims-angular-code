import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropSoilEditComponent } from './crop-soil-edit.component';

describe('CropSoilEditComponent', () => {
  let component: CropSoilEditComponent;
  let fixture: ComponentFixture<CropSoilEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropSoilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropSoilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
