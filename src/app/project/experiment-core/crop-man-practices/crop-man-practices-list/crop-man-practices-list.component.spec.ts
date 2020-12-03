import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManPracticesListComponent } from './crop-man-practices-list.component';

describe('CropManPracticesListComponent', () => {
  let component: CropManPracticesListComponent;
  let fixture: ComponentFixture<CropManPracticesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CropManPracticesListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropManPracticesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
