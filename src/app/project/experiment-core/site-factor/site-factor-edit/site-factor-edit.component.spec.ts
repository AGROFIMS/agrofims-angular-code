import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditComponent } from './site-factor-edit.component';

describe('SiteFactorEditComponent', () => {
  let component: SiteFactorEditComponent;
  let fixture: ComponentFixture<SiteFactorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
