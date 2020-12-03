import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditIiComponent } from './site-design-edit-ii.component';

describe('SiteDesignEditIiComponent', () => {
  let component: SiteDesignEditIiComponent;
  let fixture: ComponentFixture<SiteDesignEditIiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditIiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
