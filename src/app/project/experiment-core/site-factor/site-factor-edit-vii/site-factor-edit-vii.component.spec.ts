import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditViiComponent } from './site-factor-edit-vii.component';

describe('SiteFactorEditViiComponent', () => {
  let component: SiteFactorEditViiComponent;
  let fixture: ComponentFixture<SiteFactorEditViiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditViiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditViiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
