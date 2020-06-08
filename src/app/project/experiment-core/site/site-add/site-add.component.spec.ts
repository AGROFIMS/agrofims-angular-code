import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAddComponent } from './site-add.component';

describe('SiteAddComponent', () => {
  let component: SiteAddComponent;
  let fixture: ComponentFixture<SiteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
