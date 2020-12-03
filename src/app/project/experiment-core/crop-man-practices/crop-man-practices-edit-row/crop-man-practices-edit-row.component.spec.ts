import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManPracticesEditRowComponent } from './crop-man-practices-edit-row.component';

describe('CropManPracticesEditRowComponent', () => {
  let component: CropManPracticesEditRowComponent;
  let fixture: ComponentFixture<CropManPracticesEditRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropManPracticesEditRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropManPracticesEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
