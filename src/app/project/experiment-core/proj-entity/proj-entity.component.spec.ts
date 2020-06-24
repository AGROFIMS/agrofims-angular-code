import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjEntityComponent } from './proj-entity.component';

describe('ProjEntityComponent', () => {
  let component: ProjEntityComponent;
  let fixture: ComponentFixture<ProjEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
