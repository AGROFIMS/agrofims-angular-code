import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorFertilizerEditRowComponent } from './factor-fertilizer-edit-row.component';

describe('FactorFertilizerEditRowComponent', () => {
  let component: FactorFertilizerEditRowComponent;
  let fixture: ComponentFixture<FactorFertilizerEditRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorFertilizerEditRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorFertilizerEditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
