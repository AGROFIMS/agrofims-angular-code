import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilEditComponent } from './soil-edit.component';

describe('SoilEditComponent', () => {
  let component: SoilEditComponent;
  let fixture: ComponentFixture<SoilEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
