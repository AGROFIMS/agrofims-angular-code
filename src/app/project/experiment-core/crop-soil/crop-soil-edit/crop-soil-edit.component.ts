import { Component, Input, OnInit } from '@angular/core';
import { CropSoil } from '../model/crop-soil';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { ParameterService } from '../../parameter/service/parameter.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { CropSoilListComponent } from '../crop-soil-list/crop-soil-list.component';
import { CropSoilService } from '../service/crop-soil.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { Parameter } from '../../parameter/model/parameter';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-crop-soil-edit',
  templateUrl: './crop-soil-edit.component.html',
  styleUrls: ['./crop-soil-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class CropSoilEditComponent implements OnInit {

  constructor(
    private cropSoilService: CropSoilService,
    private compCropSoilList: CropSoilListComponent,
    private studyVariableService: StudyVariableService,
    private parameterService: ParameterService,
  ) { }

  @Input() cropSoil: CropSoil;
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

  ngOnInit(): void {
    this.get(this.cropSoil.soilId);
    this.getMeasurement(this.cropSoil.studyVariableId);
    this.getParameterListI();
  }

  get(id: string) {
    return this.cropSoilService
      .get(id)
      .subscribe(
        (_cropSoil: CropSoil) => {

          try {
            this.itemsSelected = _cropSoil.timingDaysAfterPlanting.split('|');
          } catch (error) {
            try {
              this.itemsSelected = _cropSoil.timingFrequency.split('|');
            } catch (error) {
              try {
                this.itemsSelected = _cropSoil.timingDate.split('|');
              } catch (error) {
                try {
                  this.itemsSelected = _cropSoil.timingGrowthStage.split('|');
                } catch (error) {
                  try {
                    this.itemsSelected = _cropSoil.timingOther.split('|');
                  } catch (error) {

                  }
                }
              }
            }
          }

          try {
            this.depthItemSelectedList = _cropSoil.depth.split('|');
          } catch (error) {

          }

          try {
            const timingDateList: string[] = _cropSoil.timingDate.split('|');
            timingDateList.forEach(timingDate => {
              const _timingDate = new Date(timingDate).toISOString();
              const dateFormControl = new FormControl(_timingDate);
              this.dateFormControlList.push(dateFormControl);
            });
          } catch (error) {
          }

          this.cropSoil = _cropSoil;
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

  remove(cropSoil: CropSoil): void {
    this.cropSoilService
      .delete(cropSoil.soilId)
      .subscribe(() => {
        this.compCropSoilList.remove(this.index);
      });
  }

  put() {
    this.cropSoilService
      .put(this.cropSoil)
      .subscribe();
  }

  removeDepth(depthItemSelected: string): void {
    const index = this.depthItemSelectedList.indexOf(depthItemSelected);
    if (index >= 0) {
      this.depthItemSelectedList.splice(index, 1);
      this.cropSoil.depth = this.depthItemSelectedList.join('|');
      this.put();
    }
  }

  addDepth(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.depthItemSelectedList.indexOf(value);
      if (index < 0) {
        this.depthItemSelectedList.push(value.trim());
        this.cropSoil.depth = this.depthItemSelectedList.join('|');
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }


  timingChange() {
    if (this.cropSoil.timing === '261') {
      this.itemsSelected = [];
      this.cropSoil.timingDaysAfterPlanting = null;
      this.cropSoil.timingFrequency = null;
      this.cropSoil.timingGrowthStage = null;
      this.cropSoil.timingOther = null;
      this.addDate();
    } else {
      this.timingClear();
    }
  }

  timingClear() {
    this.itemsSelected = [];
    this.cropSoil.timingDaysAfterPlanting = null;
    this.cropSoil.timingFrequency = null;
    this.cropSoil.timingDate = null;
    this.cropSoil.timingGrowthStage = null;
    this.cropSoil.timingOther = null;
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
        if (this.cropSoil.timing === '259') {
          this.cropSoil.timingDaysAfterPlanting = this.itemsSelected.join('|');
        } else if (this.cropSoil.timing === '260') {
          this.cropSoil.timingFrequency = this.itemsSelected.join('|');
        } else if (this.cropSoil.timing === '261') {
          this.cropSoil.timingDate = this.itemsSelected.join('|');
        } else if (this.cropSoil.timing === '262') {
          this.cropSoil.timingGrowthStage = this.itemsSelected.join('|');
        } else if (this.cropSoil.timing === '263') {
          this.cropSoil.timingOther = this.itemsSelected.join('|');
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
      if (this.cropSoil.timing === '259') {
        this.cropSoil.timingDaysAfterPlanting = this.itemsSelected.join('|');
      } else if (this.cropSoil.timing === '260') {
        this.cropSoil.timingFrequency = this.itemsSelected.join('|');
      } else if (this.cropSoil.timing === '261') {
        this.cropSoil.timingDate = this.itemsSelected.join('|');
      } else if (this.cropSoil.timing === '262') {
        this.cropSoil.timingGrowthStage = this.itemsSelected.join('|');
      } else if (this.cropSoil.timing === '263') {
        this.cropSoil.timingOther = this.itemsSelected.join('|');
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
    this.cropSoil.timingDate = timingDateList.join('|');
    this.put();
  }

  removeDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList.splice(i, 1);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.cropSoil.timingDate = timingDateList.join('|');
    this.put();
  }

  updateDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList[i].setValue(this.dateFormControlList[i].value.toISOString());
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.cropSoil.timingDate = timingDateList.join('|');
    this.put();
  }
}
