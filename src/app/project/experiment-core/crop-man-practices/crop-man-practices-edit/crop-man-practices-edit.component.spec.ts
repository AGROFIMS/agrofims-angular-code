import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManPracticesEditComponent } from './crop-man-practices-edit.component';

describe('CropManPracticesEditComponent', () => {
  let component: CropManPracticesEditComponent;
  let fixture: ComponentFixture<CropManPracticesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropManPracticesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropManPracticesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
