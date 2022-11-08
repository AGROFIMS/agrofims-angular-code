import { Component, OnInit, Input } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { CropMeasurement } from '../model/crop-measurement';
import { CropMeasurementService } from '../service/crop-measurement.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-crop-measurement-list',
  templateUrl: './crop-measurement-list.component.html',
  styleUrls: ['./crop-measurement-list.component.css']
})
export class CropMeasurementListComponent implements OnInit {

  @Input() siteCropId: string;
  @Input() cropId: string;
  @Input() cropCommonName: string;
  @Input() expSiteId: string;
  @Input() cropMeasurementList: CropMeasurement[];


  cropMeasurementListFilter: CropMeasurement[] = [];



  myControl = new FormControl('', [Validators.required]);

  // myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  measurementList: {
    index: string,
    value: string,
    unit: string,
    group: string,
  }[] = [];

  constructor(
    private cropMeasurementService: CropMeasurementService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();
    this.getAll(this.siteCropId, this.cropId);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll(siteCropId: any, cropId: any) {
    if (this.cropMeasurementList) {
      this.cropMeasurementListFilter = this.cropMeasurementList
        .filter(obj => obj.siteCropId === siteCropId);
    }
  }

  getMeasurementList() {
    if (this.cropCommonName && this.cropCommonName.substring(0, 5).toLowerCase() === 'other') {
      return this.studyVariableService
        .getById('crop_measurement')
        .subscribe(
          (_measurementList: StudyVariable[]) => {
            _measurementList
              .filter(
                item => item.cropName.trim().toLowerCase() === 'other'
              )
              .forEach(element => {
                const index = element.studyVariableId;
                const value = element.measurement;
                const unit = element.defaultVariableValue;
                const defaultGroup = element.group.split('|').length === 1 ? (element.group.split('|')[0]) : (null);
                const group = defaultGroup;
                const measurement: { index: string, value: string, unit: string, group: string } = { index, value, unit, group };
                this.measurementList.push(measurement);
              });
            this.myControl.setValue('');
          }
        );
    } else {
      return this.studyVariableService
        .getById('crop_measurement')
        .subscribe(
          (_measurementList: StudyVariable[]) => {
            _measurementList
              .filter(
                item => item.cropName.trim() === this.cropCommonName ? this.cropCommonName.trim() : ''
              )
              .forEach(element => {
                const index = element.studyVariableId;
                const value = element.measurement;
                const unit = element.defaultVariableValue;
                const defaultGroup = element.group.split('|').length === 1 ? (element.group.split('|')[0]) : (null);
                const group = defaultGroup;
                const measurement: { index: string, value: string, unit: string, group: string } = { index, value, unit, group };
                this.measurementList.push(measurement);
              });
            this.myControl.setValue('');
          }
        );
    }
  }

  remove(index: number) {
    this.deleteObjFromList(this.cropMeasurementListFilter[index], this.cropMeasurementList);
    this.cropMeasurementListFilter.splice(index, 1);
  }

  deleteObjFromList(obj: any, objList: any[]) {
    const index: number = objList.indexOf(obj);
    if (index !== -1) {
      objList.splice(index, 1);
    }
  }

  post() {
    const _value = this.myControl.value;
    const _index = this.measurementList.find(element => element.value === _value.toString()).index;
    const _unit = this.measurementList.find(element => element.value === _value.toString()).unit;
    const _group = this.measurementList.find(element => element.value === _value.toString()).group;

    const _cropMeasurement = new CropMeasurement(
      this.siteCropId,
      this.expSiteId,
      _index,
      this.cropId,
      _group, _unit, '1', '1',
      null, null, null, null,
      null, null, 'on', null,
      _value);

    this.cropMeasurementService.post(_cropMeasurement)
      .subscribe(
        (val) => {
          _cropMeasurement.cropMeasurementId = val['result'];

          this.cropMeasurementList.push(_cropMeasurement);
          this.cropMeasurementListFilter.push(_cropMeasurement);
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
    // if (this.cropMeasurementListFilter.find(element => element.measurement === option)) {
    //   return true;
    // } else {
    return false;
    // }
  }
}
