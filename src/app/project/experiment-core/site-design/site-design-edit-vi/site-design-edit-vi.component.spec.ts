import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDesignEditViComponent } from './site-design-edit-vi.component';

describe('SiteDesignEditViComponent', () => {
  let component: SiteDesignEditViComponent;
  let fixture: ComponentFixture<SiteDesignEditViComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteDesignEditViComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteDesignEditViComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
