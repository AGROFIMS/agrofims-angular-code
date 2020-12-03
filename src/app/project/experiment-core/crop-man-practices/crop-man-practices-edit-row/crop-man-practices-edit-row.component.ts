import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CropManPractices } from '../model/crop-man-practices';
import { CropManPracticesService } from '../service/crop-man-practices.service';
import { CropManPracticesEditComponent } from '../crop-man-practices-edit/crop-man-practices-edit.component';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { FormControl } from '@angular/forms';
import { isNull } from 'util';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@Component({
  selector: 'app-crop-man-practices-edit-row',
  templateUrl: './crop-man-practices-edit-row.component.html',
  styleUrls: ['./crop-man-practices-edit-row.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CropManPracticesEditRowComponent implements OnInit, OnChanges {
  @Input() cropManPractices: CropManPractices;
  @Input() index: number;
  @Input() application: string;

  variableDataType: string = null;
  defaultVariableValue: string = null;

  variableUnitList: string[];
  variableCategoryList: string[];
  manPracticeTypeList: string[];

  dateValue = new FormControl();
  otherValue = new FormControl();

  constructor(
    private compCropManPracticesEdit: CropManPracticesEditComponent,
    private cropManPracticesService: CropManPracticesService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurement();
  }

  ngOnChanges() {
  }

  getMeasurement() {
    return this.studyVariableService
      .get(this.cropManPractices.studyVariableId)
      .subscribe(
        (_measurement: StudyVariable) => {
          // variableDataType|
          // ----------------|
          // DATE            |
          // INTEGER         |
          // CATEGORICAL     |
          // TEXT            |
          // DECIMAL         |
          // OTHER           |
          if (_measurement.variableDataType) { this.variableDataType = _measurement.variableDataType.trim(); }
          if (_measurement.defaultVariableValue) { this.defaultVariableValue = _measurement.defaultVariableValue.trim(); }

          try {
            this.variableUnitList = _measurement.variableUnit.split('|');
          } catch (error) {
            this.variableUnitList = [];
          }
          try {
            this.variableCategoryList = _measurement.variableCategory.split('|');
          } catch (error) {
            this.variableCategoryList = [];
          }
          try {
            this.manPracticeTypeList = _measurement.variableLevel.split('|');
          } catch (error) {
            this.manPracticeTypeList = [];
          }

          // load unit
          if (!this.cropManPractices.unit) {
            this.cropManPractices.unit = this.defaultVariableValue;
          }

          // load value
          if (this.cropManPractices.value) {
            if (
              (this.variableDataType === 'DATE') || (this.variableDataType === 'OTHER' && this.cropManPractices.manPracticeType === 'date')
            ) {
              this.dateValue.setValue(new Date(this.cropManPractices.value).toISOString());
            } else if (
              this.variableDataType === 'OTHER' && this.cropManPractices.manPracticeType === 'numeric value'
            ) {
              this.otherValue.setValue(this.cropManPractices.value);
            } else if (
              this.variableDataType === 'OTHER' && this.cropManPractices.manPracticeType === 'numeric value + date'
            ) {
              this.otherValue.setValue(this.cropManPractices.value.split('|')[0]);
              this.dateValue.setValue(new Date(this.cropManPractices.value.split('|')[1]).toISOString());
            }
          }

        }
      );
  }

  manPracticeTypeChange() {
    this.dateValue.setValue(null);
    this.otherValue.setValue(null);
    this.cropManPractices.value = null;
    this.cropManPractices.unit = null;
    this.put();
  }

  remove(cropManPractices: CropManPractices): void {
    this.cropManPracticesService
      .delete(cropManPractices.cropManPracticesId)
      .subscribe(() => {
        this.compCropManPracticesEdit.removeItem(this.index);
      });
  }

  otherChange() {
    if (this.cropManPractices.manPracticeType === 'numeric value + date') {
      this.cropManPractices.value = this.otherValue.value + '|' + this.dateValue.value.toISOString().slice(0, 19).replace('T', ' ');
    } else {
      this.cropManPractices.value = this.otherValue.value;
    }
    this.put();
  }

  dateChange() {
    if (this.cropManPractices.manPracticeType === 'numeric value + date') {
      this.cropManPractices.value = this.otherValue.value + '|' + this.dateValue.value.toISOString().slice(0, 19).replace('T', ' ');
    } else {
      this.cropManPractices.value = this.dateValue.value.toISOString().slice(0, 19).replace('T', ' ');
    }
    this.put();
  }


  put() {
    this.cropManPracticesService
      .put(this.cropManPractices)
      .subscribe();
  }

}
