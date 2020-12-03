import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditIvComponent } from './site-design-edit-iv.component';

describe('SiteDesignEditIvComponent', () => {
  let component: SiteDesignEditIvComponent;
  let fixture: ComponentFixture<SiteDesignEditIvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditIvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditIvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
