import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFileListComponent } from './site-file-list.component';

describe('SiteFileListComponent', () => {
  let component: SiteFileListComponent;
  let fixture: ComponentFixture<SiteFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
