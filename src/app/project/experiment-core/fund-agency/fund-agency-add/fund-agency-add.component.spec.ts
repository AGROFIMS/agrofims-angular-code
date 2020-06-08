import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAgencyAddComponent } from './fund-agency-add.component';

describe('FundAgencyAddComponent', () => {
  let component: FundAgencyAddComponent;
  let fixture: ComponentFixture<FundAgencyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAgencyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAgencyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
