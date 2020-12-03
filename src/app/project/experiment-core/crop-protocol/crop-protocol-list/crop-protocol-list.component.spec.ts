import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropProtocolListComponent } from './crop-protocol-list.component';

describe('CropProtocolListComponent', () => {
  let component: CropProtocolListComponent;
  let fixture: ComponentFixture<CropProtocolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropProtocolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropProtocolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
