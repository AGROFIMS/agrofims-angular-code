import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundAgencyListComponent } from './fund-agency-list.component';

describe('FundAgencyListComponent', () => {
  let component: FundAgencyListComponent;
  let fixture: ComponentFixture<FundAgencyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundAgencyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundAgencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
