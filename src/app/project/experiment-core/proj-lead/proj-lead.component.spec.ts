import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjLeadComponent } from './proj-lead.component';

describe('ProjLeadComponent', () => {
  let component: ProjLeadComponent;
  let fixture: ComponentFixture<ProjLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
