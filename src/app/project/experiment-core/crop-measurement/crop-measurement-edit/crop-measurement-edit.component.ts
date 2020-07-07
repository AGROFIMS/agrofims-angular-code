import { Component, OnInit, Input } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { CropMeasurement } from '../model/crop-measurement';
import { CropMeasurementService } from '../service/crop-measurement.service';
import { CropMeasurementListComponent } from '../crop-measurement-list/crop-measurement-list.component';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-crop-measurement-edit',
  templateUrl: './crop-measurement-edit.component.html',
  styleUrls: ['./crop-measurement-edit.component.css']
})
export class CropMeasurementEditComponent implements OnInit {
  @Input() id: any;
  @Input() index: any;
  @Input() studyVariableId: any;

  cropMeasurement: CropMeasurement = new CropMeasurement(
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'on');
  measurement: StudyVariable = new StudyVariable(
    null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null, null, null, null, 'on');
  measurementGroupList: string[];
  measurementVariableUnitList: string[];
  parameterListI: Parameter[] = [];
  dateList: string[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];

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
            this.dateList = _cropMeasurement.timingDate.split('|');
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
      .getAll('crop_measurement', 'timing')
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

  timingClear() {
    this.itemsSelected = [];
    this.cropMeasurement.timingDaysAfterPlanting = null;
    this.cropMeasurement.timingFrequency = null;
    this.cropMeasurement.timingDate = null;
    this.cropMeasurement.timingGrowthStage = null;
    this.cropMeasurement.timingOther = null;
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
    this.dateList.push('2020-07-05');
    this.cropMeasurement.timingDate = this.dateList.join('|');
    this.put();
  }

  removeDate(i: number) {
    this.dateList.splice(i, 1);
    this.cropMeasurement.timingDate = this.dateList.join('|');
    this.put();
  }

  updateDate() {
    console.log(this.dateList);
    this.cropMeasurement.timingDate = this.dateList.join('|');
    this.put();
  }

}
