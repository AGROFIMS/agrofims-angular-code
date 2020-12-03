import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditIiComponent } from './site-factor-edit-ii.component';

describe('SiteFactorEditIiComponent', () => {
  let component: SiteFactorEditIiComponent;
  let fixture: ComponentFixture<SiteFactorEditIiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditIiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
