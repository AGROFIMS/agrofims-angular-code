import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorListIComponent } from './site-factor-list-i.component';

describe('SiteFactorListIComponent', () => {
  let component: SiteFactorListIComponent;
  let fixture: ComponentFixture<SiteFactorListIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorListIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorListIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
