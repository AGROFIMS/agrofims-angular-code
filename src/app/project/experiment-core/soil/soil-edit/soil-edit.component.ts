import { Component, OnInit, Input } from '@angular/core';
import { SoilService } from '../service/soil.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Soil } from '../model/soil';
import { FormControl } from '@angular/forms';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { ParameterService } from '../../parameter/service/parameter.service';
import { SoilListComponent } from '../soil-list/soil-list.component';
import { Parameter } from '../../parameter/model/parameter';
import { MatChipInputEvent } from '@angular/material/chips';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@Component({
  selector: 'app-soil-edit',
  templateUrl: './soil-edit.component.html',
  styleUrls: ['./soil-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SoilEditComponent implements OnInit {

  @Input() soil: Soil;
  @Input() index: number;

  measurement: StudyVariable = new StudyVariable(
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, 'on');

  measurementVariableUnitList: string[];
  measurementVariableDepthUnitList: string[];

  parameterListI: Parameter[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];
  depthItemSelectedList: string[] = [];

  dateFormControlList = [];

  constructor(
    private soilService: SoilService,
    private compSoilList: SoilListComponent,
    private studyVariableService: StudyVariableService,
    private parameterService: ParameterService,
  ) { }


  ngOnInit(): void {
    this.get(this.soil.soilId);
    this.getMeasurement(this.soil.studyVariableId);
    this.getParameterListI();
  }

  get(id: string) {
    return this.soilService
      .get(id)
      .subscribe(
        (_weather: Soil) => {

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
            this.depthItemSelectedList = _weather.depth.split('|');
          } catch (error) {

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

          this.soil = _weather;
        });
  }

  getMeasurement(studyVariableId: string) {
    return this.studyVariableService
      .get(studyVariableId)
      .subscribe(
        (_measurement: StudyVariable) => {
          this.measurement = _measurement;
          try {
            this.measurementVariableUnitList = _measurement.variableUnit.split('|');
          } catch (error) {
            this.measurementVariableUnitList = [];
          }
          try {
            this.measurementVariableDepthUnitList = _measurement.depthUnit.split('|');
          } catch (error) {
            this.measurementVariableDepthUnitList = [];
          }
        }
      );
  }

  getParameterListI() {
    return this.parameterService
      .getAll('multiple_measurement', 'timing')
      .subscribe((_parameterListI: Parameter[]) => this.parameterListI = _parameterListI);
  }

  remove(soil: Soil): void {
    this.soilService
      .delete(soil.soilId)
      .subscribe(() => {
        this.compSoilList.remove(this.index);
      });
  }

  put() {
    this.soilService
      .put(this.soil)
      .subscribe();
  }

  timingChange() {
    if (this.soil.timing === '261') {
      this.itemsSelected = [];
      this.soil.timingDaysAfterPlanting = null;
      this.soil.timingFrequency = null;
      this.soil.timingGrowthStage = null;
      this.soil.timingOther = null;
      this.addDate();
    } else {
      this.timingClear();
    }
  }

  timingClear() {
    this.itemsSelected = [];
    this.soil.timingDaysAfterPlanting = null;
    this.soil.timingFrequency = null;
    this.soil.timingDate = null;
    this.soil.timingGrowthStage = null;
    this.soil.timingOther = null;
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
        if (this.soil.timing === '259') {
          this.soil.timingDaysAfterPlanting = this.itemsSelected.join('|');
        } else if (this.soil.timing === '260') {
          this.soil.timingFrequency = this.itemsSelected.join('|');
        } else if (this.soil.timing === '261') {
          this.soil.timingDate = this.itemsSelected.join('|');
        } else if (this.soil.timing === '262') {
          this.soil.timingGrowthStage = this.itemsSelected.join('|');
        } else if (this.soil.timing === '263') {
          this.soil.timingOther = this.itemsSelected.join('|');
        }
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  addDepth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.depthItemSelectedList.indexOf(value);
      if (index < 0) {
        this.depthItemSelectedList.push(value.trim());
        this.soil.depth = this.depthItemSelectedList.join('|');
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
      if (this.soil.timing === '259') {
        this.soil.timingDaysAfterPlanting = this.itemsSelected.join('|');
      } else if (this.soil.timing === '260') {
        this.soil.timingFrequency = this.itemsSelected.join('|');
      } else if (this.soil.timing === '261') {
        this.soil.timingDate = this.itemsSelected.join('|');
      } else if (this.soil.timing === '262') {
        this.soil.timingGrowthStage = this.itemsSelected.join('|');
      } else if (this.soil.timing === '263') {
        this.soil.timingOther = this.itemsSelected.join('|');
      }
      this.put();
    }
  }

  removeDepth(depthItemSelected: string): void {
    const index = this.depthItemSelectedList.indexOf(depthItemSelected);
    if (index >= 0) {
      this.depthItemSelectedList.splice(index, 1);
      this.soil.depth = this.depthItemSelectedList.join('|');
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
    this.soil.timingDate = timingDateList.join('|');
    this.put();
  }

  removeDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList.splice(i, 1);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.soil.timingDate = timingDateList.join('|');
    this.put();
  }

  updateDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList[i].setValue(this.dateFormControlList[i].value.toISOString());
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.soil.timingDate = timingDateList.join('|');
    this.put();
  }
}
