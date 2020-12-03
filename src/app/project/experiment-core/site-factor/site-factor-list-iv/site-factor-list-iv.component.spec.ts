import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorListIvComponent } from './site-factor-list-iv.component';

describe('SiteFactorListIvComponent', () => {
  let component: SiteFactorListIvComponent;
  let fixture: ComponentFixture<SiteFactorListIvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorListIvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorListIvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
