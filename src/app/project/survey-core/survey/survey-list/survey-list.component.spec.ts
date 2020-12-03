import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListComponent } from './survey-list.component';

describe('SurveyListComponent', () => {
  let component: SurveyListComponent;
  let fixture: ComponentFixture<SurveyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
