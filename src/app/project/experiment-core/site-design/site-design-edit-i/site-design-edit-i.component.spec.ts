import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditIComponent } from './site-design-edit-i.component';

describe('SiteDesignEditIComponent', () => {
  let component: SiteDesignEditIComponent;
  let fixture: ComponentFixture<SiteDesignEditIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
