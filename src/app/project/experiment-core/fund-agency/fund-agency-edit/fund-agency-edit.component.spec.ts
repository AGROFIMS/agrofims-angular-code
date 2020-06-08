import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAgencyEditComponent } from './fund-agency-edit.component';

describe('FundAgencyEditComponent', () => {
  let component: FundAgencyEditComponent;
  let fixture: ComponentFixture<FundAgencyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAgencyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAgencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
