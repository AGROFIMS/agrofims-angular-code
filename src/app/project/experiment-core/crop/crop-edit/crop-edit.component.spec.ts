import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropEditComponent } from './crop-edit.component';

describe('CropEditComponent', () => {
  let component: CropEditComponent;
  let fixture: ComponentFixture<CropEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
