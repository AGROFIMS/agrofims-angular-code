import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditComponent } from './site-design-edit.component';

describe('SiteDesignEditComponent', () => {
  let component: SiteDesignEditComponent;
  let fixture: ComponentFixture<SiteDesignEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
