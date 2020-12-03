import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditVComponent } from './site-factor-edit-v.component';

describe('SiteFactorEditVComponent', () => {
  let component: SiteFactorEditVComponent;
  let fixture: ComponentFixture<SiteFactorEditVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
