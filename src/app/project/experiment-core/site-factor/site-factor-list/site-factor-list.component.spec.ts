import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFactorListComponent } from './site-factor-list.component';

describe('SiteFactorListComponent', () => {
  let component: SiteFactorListComponent;
  let fixture: ComponentFixture<SiteFactorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFactorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFactorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
