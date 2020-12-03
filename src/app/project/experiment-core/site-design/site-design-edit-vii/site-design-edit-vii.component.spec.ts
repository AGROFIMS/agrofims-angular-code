import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditViiComponent } from './site-design-edit-vii.component';

describe('SiteDesignEditViiComponent', () => {
  let component: SiteDesignEditViiComponent;
  let fixture: ComponentFixture<SiteDesignEditViiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditViiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditViiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
