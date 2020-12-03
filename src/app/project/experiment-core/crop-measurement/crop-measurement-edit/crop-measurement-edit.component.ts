import { Component, OnInit, Input } from '@angular/core';
import { CropMeasurement } from '../model/crop-measurement';
import { CropMeasurementService } from '../service/crop-measurement.service';
import { CropMeasurementListComponent } from '../crop-measurement-list/crop-measurement-list.component';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@Component({
  selector: 'app-crop-measurement-edit',
  templateUrl: './crop-measurement-edit.component.html',
  styleUrls: ['./crop-measurement-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CropMeasurementEditComponent implements OnInit {
  @Input() id: any;
  @Input() index: any;
  @Input() studyVariableId: any;

  cropMeasurement: CropMeasurement = new CropMeasurement(
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'on');

  measurement: StudyVariable = new StudyVariable(
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, 'on');

  measurementGroupList: string[];
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
    private cropMeasurementService: CropMeasurementService,
    private compCropMeasurementList: CropMeasurementListComponent,
    private studyVariableService: StudyVariableService,
    private parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.get(this.id);
    this.getMeasurement(this.studyVariableId);
    this.getParameterListI();
  }

  get(id: string) {
    return this.cropMeasurementService
      .get(id)
      .subscribe(
        (_cropMeasurement: CropMeasurement) => {
          try {
            this.itemsSelected = _cropMeasurement.timingDaysAfterPlanting.split('|');
          } catch (error) {
            try {
              this.itemsSelected = _cropMeasurement.timingFrequency.split('|');
            } catch (error) {
              try {
                this.itemsSelected = _cropMeasurement.timingDate.split('|');
              } catch (error) {
                try {
                  this.itemsSelected = _cropMeasurement.timingGrowthStage.split('|');
                } catch (error) {
                  try {
                    this.itemsSelected = _cropMeasurement.timingOther.split('|');
                  } catch (error) {
                  }
                }
              }
            }
          }
          try {
            const timingDateList: string[] = _cropMeasurement.timingDate.split('|');
            timingDateList.forEach(timingDate => {
              const _timingDate = new Date(timingDate).toISOString();
              const dateFormControl = new FormControl(_timingDate);
              this.dateFormControlList.push(dateFormControl);
            });
          } catch (error) {
          }
          this.cropMeasurement = _cropMeasurement;
        });
  }

  getMeasurement(studyVariableId: string) {
    return this.studyVariableService
      .get(studyVariableId)
      .subscribe(
        (_measurement: StudyVariable) => {
          this.measurement = _measurement;
          this.measurementGroupList = _measurement.group.split('|');
          this.measurementVariableUnitList = _measurement.variableUnit.split('|');
        }
      );
  }

  getParameterListI() {
    return this.parameterService
      .getAll('multiple_measurement', 'timing')
      .subscribe((_parameterListI: Parameter[]) => this.parameterListI = _parameterListI);
  }

  remove(cropMeasurement: CropMeasurement): void {
    this.cropMeasurementService
      .delete(cropMeasurement.cropMeasurementId)
      .subscribe(() => {
        this.compCropMeasurementList.remove(this.index);
      });
  }

  put() {
    this.cropMeasurementService
      .put(this.cropMeasurement)
      .subscribe();
  }

  timingChange() {
    if (this.cropMeasurement.timing === '261') {
      this.itemsSelected = [];
      this.cropMeasurement.timingDaysAfterPlanting = null;
      this.cropMeasurement.timingFrequency = null;
      this.cropMeasurement.timingGrowthStage = null;
      this.cropMeasurement.timingOther = null;
      this.addDate();
    } else {
      this.timingClear();
    }
  }

  timingClear() {
    this.itemsSelected = [];
    this.cropMeasurement.timingDaysAfterPlanting = null;
    this.cropMeasurement.timingFrequency = null;
    this.cropMeasurement.timingGrowthStage = null;
    this.cropMeasurement.timingOther = null;
    this.cropMeasurement.timingDate = null;
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
        if (this.cropMeasurement.timing === '259') {
          this.cropMeasurement.timingDaysAfterPlanting = this.itemsSelected.join('|');
        } else if (this.cropMeasurement.timing === '260') {
          this.cropMeasurement.timingFrequency = this.itemsSelected.join('|');
        } else if (this.cropMeasurement.timing === '261') {
          this.cropMeasurement.timingDate = this.itemsSelected.join('|');
        } else if (this.cropMeasurement.timing === '262') {
          this.cropMeasurement.timingGrowthStage = this.itemsSelected.join('|');
        } else if (this.cropMeasurement.timing === '263') {
          this.cropMeasurement.timingOther = this.itemsSelected.join('|');
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
      if (this.cropMeasurement.timing === '259') {
        this.cropMeasurement.timingDaysAfterPlanting = this.itemsSelected.join('|');
      } else if (this.cropMeasurement.timing === '260') {
        this.cropMeasurement.timingFrequency = this.itemsSelected.join('|');
      } else if (this.cropMeasurement.timing === '261') {
        this.cropMeasurement.timingDate = this.itemsSelected.join('|');
      } else if (this.cropMeasurement.timing === '262') {
        this.cropMeasurement.timingGrowthStage = this.itemsSelected.join('|');
      } else if (this.cropMeasurement.timing === '263') {
        this.cropMeasurement.timingOther = this.itemsSelected.join('|');
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
    this.cropMeasurement.timingDate = timingDateList.join('|');
    this.put();
  }

  removeDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList.splice(i, 1);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.cropMeasurement.timingDate = timingDateList.join('|');
    this.put();
  }

  updateDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList[i].setValue(this.dateFormControlList[i].value.toISOString());
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 19).replace('T', ' '));
    });
    this.cropMeasurement.timingDate = timingDateList.join('|');
    this.put();
  }

}
