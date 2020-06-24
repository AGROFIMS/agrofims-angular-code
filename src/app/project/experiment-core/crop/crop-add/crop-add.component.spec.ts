import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropAddComponent } from './crop-add.component';

describe('CropAddComponent', () => {
  let component: CropAddComponent;
  let fixture: ComponentFixture<CropAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
