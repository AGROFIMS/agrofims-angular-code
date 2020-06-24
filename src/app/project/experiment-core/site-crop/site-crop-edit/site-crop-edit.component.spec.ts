import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCropEditComponent } from './site-crop-edit.component';

describe('SiteCropEditComponent', () => {
  let component: SiteCropEditComponent;
  let fixture: ComponentFixture<SiteCropEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteCropEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteCropEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
