import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjEntityEditComponent } from './proj-entity-edit.component';

describe('ProjEntityEditComponent', () => {
  let component: ProjEntityEditComponent;
  let fixture: ComponentFixture<ProjEntityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjEntityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjEntityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
