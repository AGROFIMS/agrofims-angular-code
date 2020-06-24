import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjLeadListComponent } from './proj-lead-list.component';

describe('ProjLeadListComponent', () => {
  let component: ProjLeadListComponent;
  let fixture: ComponentFixture<ProjLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
