import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditViiiComponent } from './site-factor-edit-viii.component';

describe('SiteFactorEditViiiComponent', () => {
  let component: SiteFactorEditViiiComponent;
  let fixture: ComponentFixture<SiteFactorEditViiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditViiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditViiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
