import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentManageComponent } from './experiment-manage.component';

describe('ExperimentManageComponent', () => {
  let component: ExperimentManageComponent;
  let fixture: ComponentFixture<ExperimentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
