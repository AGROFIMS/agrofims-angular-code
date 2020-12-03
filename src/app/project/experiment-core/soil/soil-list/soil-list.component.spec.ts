import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilListComponent } from './soil-list.component';

describe('SoilListComponent', () => {
  let component: SoilListComponent;
  let fixture: ComponentFixture<SoilListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoilListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
