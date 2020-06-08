import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpSiteAddComponent } from './exp-site-add.component';

describe('ExpSiteAddComponent', () => {
  let component: ExpSiteAddComponent;
  let fixture: ComponentFixture<ExpSiteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpSiteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpSiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
