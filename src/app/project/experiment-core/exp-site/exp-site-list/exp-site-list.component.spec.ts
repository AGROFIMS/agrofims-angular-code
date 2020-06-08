import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpSiteListComponent } from './exp-site-list.component';

describe('ExpSiteListComponent', () => {
  let component: ExpSiteListComponent;
  let fixture: ComponentFixture<ExpSiteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpSiteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpSiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
