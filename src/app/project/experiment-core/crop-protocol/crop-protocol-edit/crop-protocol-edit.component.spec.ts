import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropProtocolEditComponent } from './crop-protocol-edit.component';

describe('CropProtocolEditComponent', () => {
  let component: CropProtocolEditComponent;
  let fixture: ComponentFixture<CropProtocolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropProtocolEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropProtocolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
