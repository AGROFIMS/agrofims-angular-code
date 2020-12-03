import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditIvComponent } from './site-factor-edit-iv.component';

describe('SiteFactorEditIvComponent', () => {
  let component: SiteFactorEditIvComponent;
  let fixture: ComponentFixture<SiteFactorEditIvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditIvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditIvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
