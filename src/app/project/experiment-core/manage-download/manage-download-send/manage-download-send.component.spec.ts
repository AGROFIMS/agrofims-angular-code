import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDownloadSendComponent } from './manage-download-send.component';

describe('ManageDownloadSendComponent', () => {
  let component: ManageDownloadSendComponent;
  let fixture: ComponentFixture<ManageDownloadSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDownloadSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDownloadSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
