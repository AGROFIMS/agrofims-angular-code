import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjLeadEditComponent } from './proj-lead-edit.component';

describe('ProjLeadEditComponent', () => {
  let component: ProjLeadEditComponent;
  let fixture: ComponentFixture<ProjLeadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjLeadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjLeadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
