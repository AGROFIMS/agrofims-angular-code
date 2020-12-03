import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorEditViComponent } from './site-factor-edit-vi.component';

describe('SiteFactorEditViComponent', () => {
  let component: SiteFactorEditViComponent;
  let fixture: ComponentFixture<SiteFactorEditViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorEditViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorEditViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
