import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjEntityListComponent } from './proj-entity-list.component';

describe('ProjEntityListComponent', () => {
  let component: ProjEntityListComponent;
  let fixture: ComponentFixture<ProjEntityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjEntityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjEntityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
