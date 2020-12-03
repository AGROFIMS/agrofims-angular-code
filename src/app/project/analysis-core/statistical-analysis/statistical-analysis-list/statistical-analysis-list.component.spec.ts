import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalAnalysisListComponent } from './statistical-analysis-list.component';

describe('StatisticalAnalysisListComponent', () => {
  let component: StatisticalAnalysisListComponent;
  let fixture: ComponentFixture<StatisticalAnalysisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalAnalysisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalAnalysisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
