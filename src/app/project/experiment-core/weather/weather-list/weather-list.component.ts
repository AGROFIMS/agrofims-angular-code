import { Component, OnInit, Input } from '@angular/core';
import { ExpSite } from '../../exp-site/model/exp-site';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherService } from '../service/weather.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { startWith, map } from 'rxjs/operators';
import { Weather } from '../model/weather';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.css']
})
export class WeatherListComponent implements OnInit {

  @Input() expSite: ExpSite;
  // @Input() weatherList: Weather[];

  weatherList: Weather[];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  measurementList: {
    index: string,
    value: string,
    unit: string
  }[] = [];

  constructor(
    private weatherService: WeatherService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();

    this.getAll();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll() {
    return this.weatherService
      .getById(this.expSite.expSiteId)
      .subscribe(
        (_itemList: Weather[]) => {
          this.weatherList = _itemList;
        }
      );
  }


  getMeasurementList() {
    return this.studyVariableService
      .getById('weather')
      .subscribe(
        (_measurementList: StudyVariable[]) => {
          _measurementList
            .forEach(element => {
              const index = element.studyVariableId;
              const value = element.measurement;
              const unit = element.defaultVariableValue;
              const measurement: { index: string, value: string, unit: string } = { index, value, unit };
              this.measurementList.push(measurement);
            });
          this.myControl.setValue('');
        }
      );
  }

  remove(index: number) {
    this.weatherList.splice(index, 1);
  }

  post() {
    const _value = this.myControl.value;
    const _index = this.measurementList.find(element => element.value === _value.toString()).index;
    const _unit = this.measurementList.find(element => element.value === _value.toString()).unit;

    const _weather = new Weather(
      this.expSite.expSiteId,
      _index, null, _unit, '1', null, null, null, null, null, null, 'on', null, _value);

    this.weatherService.post(_weather)
      .subscribe(
        (val) => {
          _weather.weatherId = val['result'];
          this.weatherList.push(_weather);
          this.myControl.setValue('');
        }
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.measurementList.forEach(element => {
      optionList.push(element.value);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  findElement(option: any): boolean {
    // if (this.weatherList.find(element => element.measurement === option)) {
    //   return true;
    // } else {
    return false;
    // }
  }
}

