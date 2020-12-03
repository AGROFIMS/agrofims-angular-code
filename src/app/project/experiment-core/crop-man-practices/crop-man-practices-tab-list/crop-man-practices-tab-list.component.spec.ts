import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropManPracticesTabListComponent } from './crop-man-practices-tab-list.component';

describe('CropManPracticesTabListComponent', () => {
  let component: CropManPracticesTabListComponent;
  let fixture: ComponentFixture<CropManPracticesTabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropManPracticesTabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropManPracticesTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
