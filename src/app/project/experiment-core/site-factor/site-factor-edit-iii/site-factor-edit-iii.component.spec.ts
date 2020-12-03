import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditIiiComponent } from './site-factor-edit-iii.component';

describe('SiteFactorEditIiiComponent', () => {
  let component: SiteFactorEditIiiComponent;
  let fixture: ComponentFixture<SiteFactorEditIiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditIiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditIiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
