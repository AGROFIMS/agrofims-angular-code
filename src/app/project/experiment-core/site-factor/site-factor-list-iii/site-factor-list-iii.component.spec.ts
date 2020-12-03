import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorListIiiComponent } from './site-factor-list-iii.component';

describe('SiteFactorListIiiComponent', () => {
  let component: SiteFactorListIiiComponent;
  let fixture: ComponentFixture<SiteFactorListIiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorListIiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorListIiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
