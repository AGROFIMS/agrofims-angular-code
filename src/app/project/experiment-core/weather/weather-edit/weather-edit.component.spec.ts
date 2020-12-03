import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherEditComponent } from './weather-edit.component';

describe('WeatherEditComponent', () => {
  let component: WeatherEditComponent;
  let fixture: ComponentFixture<WeatherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
