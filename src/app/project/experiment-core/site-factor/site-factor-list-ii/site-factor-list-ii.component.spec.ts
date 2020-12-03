import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorListIiComponent } from './site-factor-list-ii.component';

describe('SiteFactorListIiComponent', () => {
  let component: SiteFactorListIiComponent;
  let fixture: ComponentFixture<SiteFactorListIiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorListIiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorListIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
