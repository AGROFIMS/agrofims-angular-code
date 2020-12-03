import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditIiiComponent } from './site-design-edit-iii.component';

describe('SiteDesignEditIiiComponent', () => {
  let component: SiteDesignEditIiiComponent;
  let fixture: ComponentFixture<SiteDesignEditIiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditIiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditIiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
