import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpSiteEditComponent } from './exp-site-edit.component';

describe('ExpSiteEditComponent', () => {
  let component: ExpSiteEditComponent;
  let fixture: ComponentFixture<ExpSiteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpSiteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpSiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
