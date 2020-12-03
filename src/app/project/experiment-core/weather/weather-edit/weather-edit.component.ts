import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Weather } from '../model/weather';
import { FormControl } from '@angular/forms';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { ParameterService } from '../../parameter/service/parameter.service';
import { WeatherListComponent } from '../weather-list/weather-list.component';
import { Parameter } from '../../parameter/model/parameter';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@Component({
  selector: 'app-weather-edit',
  templateUrl: './weather-edit.component.html',
  styleUrls: ['./weather-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class WeatherEditComponent implements OnInit {

  @Input() weather: Weather;
  @Input() index: number;

  measurement: StudyVariable = new StudyVariable(
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, 'on');

  measurementVariableUnitList: string[];
  parameterListI: Parameter[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];

  dateFormControlList = [];

  constructor(
    private weatherService: WeatherService,
    private compWeatherList: WeatherListComponent,
    private studyVariableService: StudyVariableService,
    private parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.get(this.weather.weatherId);
    this.getMeasurement(this.weather.studyVariableId);
    this.getParameterListI();
  }

  get(id: string) {
    return this.weatherService
      .get(id)
      .subscribe(
        (_weather: Weather) => {
          try {
            this.itemsSelected = _weather.timingDaysAfterPlanting.split('|');
          } catch (error) {
            try {
              this.itemsSelected = _weather.timingFrequency.split('|');
            } catch (error) {
              try {
                this.itemsSelected = _weather.timingDate.split('|');
              } catch (error) {
                try {
                  this.itemsSelected = _weather.timingGrowthStage.split('|');
                } catch (error) {
                  try {
                    this.itemsSelected = _weather.timingOther.split('|');
                  } catch (error) {

                  }
                }
              }
            }
          }
          try {
            const timingDateList: string[] = _weather.timingDate.split('|');
            timingDateList.forEach(timingDate => {
              const _timingDate = new Date(timingDate).toISOString();
              const dateFormControl = new FormControl(_timingDate);
              this.dateFormControlList.push(dateFormControl);
            });
          } catch (error) {
          }
          this.weather = _weather;
        });
  }

  getMeasurement(studyVariableId: string) {
    return this.studyVariableService
      .get(studyVariableId)
      .subscribe(
        (_measurement: StudyVariable) => {
          this.measurement = _measurement;
          this.measurementVariableUnitList = _measurement.variableUnit.split('|');
        }
      );
  }

  getParameterListI() {
    return this.parameterService
      .getAll('multiple_measurement', 'timing')
      .subscribe((_parameterListI: Parameter[]) => this.parameterListI = _parameterListI);
  }

  remove(weather: Weather): void {
    this.weatherService
      .delete(weather.weatherId)
      .subscribe(() => {
        this.compWeatherList.remove(this.index);
      });
  }

  put() {
    this.weatherService.put(this.weather).subscribe();
  }

  timingChange() {
    if (this.weather.timing === '261') {
      this.itemsSelected = [];
      this.weather.timingDaysAfterPlanting = null;
      this.weather.timingFrequency = null;
      this.weather.timingGrowthStage = null;
      this.weather.timingOther = null;
      this.addDate();
    } else {
      this.timingClear();
    }
  }

  timingClear() {
    this.itemsSelected = [];
    this.weather.timingDaysAfterPlanting = null;
    this.weather.timingFrequency = null;
    this.weather.timingDate = null;
    this.weather.timingGrowthStage = null;
    this.weather.timingOther = null;
    this.dateFormControlList = [];
    this.put();
  }

  addTiming(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.itemsSelected.indexOf(value);
      if (index < 0) {
        this.itemsSelected.push(value.trim());
        if (this.weather.timing === '259') {
          this.weather.timingDaysAfterPlanting = this.itemsSelected.join('|');
        } else if (this.weather.timing === '260') {
          this.weather.timingFrequency = this.itemsSelected.join('|');
        } else if (this.weather.timing === '261') {
          this.weather.timingDate = this.itemsSelected.join('|');
        } else if (this.weather.timing === '262') {
          this.weather.timingGrowthStage = this.itemsSelected.join('|');
        } else if (this.weather.timing === '263') {
          this.weather.timingOther = this.itemsSelected.join('|');
        }
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }


  removeTiming(itemOther: string): void {
    const index = this.itemsSelected.indexOf(itemOther);
    if (index >= 0) {
      this.itemsSelected.splice(index, 1);
      if (this.weather.timing === '259') {
        this.weather.timingDaysAfterPlanting = this.itemsSelected.join('|');
      } else if (this.weather.timing === '260') {
        this.weather.timingFrequency = this.itemsSelected.join('|');
      } else if (this.weather.timing === '261') {
        this.weather.timingDate = this.itemsSelected.join('|');
      } else if (this.weather.timing === '262') {
        this.weather.timingGrowthStage = this.itemsSelected.join('|');
      } else if (this.weather.timing === '263') {
        this.weather.timingOther = this.itemsSelected.join('|');
      }
      this.put();
    }
  }

  addDate() {
    const dateNow: Date = new Date(Date.now());
    const dateFormControl = new FormControl(dateNow.toISOString());
    const timingDateList: string[] = [];
    this.dateFormControlList.push(dateFormControl);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.weather.timingDate = timingDateList.join('|');
    this.put();
  }

  removeDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList.splice(i, 1);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.weather.timingDate = timingDateList.join('|');
    this.put();
  }

  updateDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList[i].setValue(this.dateFormControlList[i].value.toISOString());
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.weather.timingDate = timingDateList.join('|');
    this.put();
  }
}
