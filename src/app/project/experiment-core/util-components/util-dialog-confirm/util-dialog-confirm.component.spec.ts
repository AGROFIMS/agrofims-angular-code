import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilDialogConfirmComponent } from './util-dialog-confirm.component';

describe('UtilDialogConfirmComponent', () => {
  let component: UtilDialogConfirmComponent;
  let fixture: ComponentFixture<UtilDialogConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilDialogConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilDialogConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
