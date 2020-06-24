import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCropListComponent } from './site-crop-list.component';

describe('SiteCropListComponent', () => {
  let component: SiteCropListComponent;
  let fixture: ComponentFixture<SiteCropListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteCropListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteCropListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
