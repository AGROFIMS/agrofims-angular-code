import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditIComponent } from './site-factor-edit-i.component';

describe('SiteFactorEditIComponent', () => {
  let component: SiteFactorEditIComponent;
  let fixture: ComponentFixture<SiteFactorEditIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
