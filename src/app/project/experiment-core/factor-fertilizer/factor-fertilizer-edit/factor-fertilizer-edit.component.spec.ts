import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorFertilizerEditComponent } from './factor-fertilizer-edit.component';

describe('FactorFertilizerEditComponent', () => {
  let component: FactorFertilizerEditComponent;
  let fixture: ComponentFixture<FactorFertilizerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorFertilizerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorFertilizerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
