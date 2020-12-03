import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditVComponent } from './site-design-edit-v.component';

describe('SiteDesignEditVComponent', () => {
  let component: SiteDesignEditVComponent;
  let fixture: ComponentFixture<SiteDesignEditVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
