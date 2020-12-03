import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { CropSoil } from '../model/crop-soil';
import { CropSoilService } from '../service/crop-soil.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-crop-soil-list',
  templateUrl: './crop-soil-list.component.html',
  styleUrls: ['./crop-soil-list.component.css']
})
export class CropSoilListComponent implements OnInit {
  @Input() siteCropList: SiteCrop[];
  @Input() expSite: ExpSite;
  @Input() siteCropId: string;
  @Input() cropId: string;
  @Input() cropCommonName: string;
  @Input() expSiteId: string;
  @Input() indexCrop: number;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  measurementList: {
    index: string,
    value: string,
    unit: string
  }[] = [];

  cropSoilList: CropSoil[] = [];
  cropSoil: CropSoil;

  constructor(
    private cropSoilService: CropSoilService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();
    this.getAll(this.siteCropId);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll(siteCropId: string) {
    return this.cropSoilService
      .getById(siteCropId)
      .subscribe(
        (_cropSoilList: CropSoil[]) => {
          this.cropSoilList = _cropSoilList;
        }
      );
  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('soil')
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

  post() {
    const _parameterMeasured = this.myControl.value;

    console.log(_parameterMeasured);

    // if (!this.cropSoilList.find(element => element.measurement === _parameterMeasured.toString())) {
    const _value = this.myControl.value;
    const _index = this.measurementList.find(element => element.value === _parameterMeasured.toString()).index;
    const _unit = this.measurementList.find(element => element.value === _parameterMeasured.toString()).unit;

    this.cropSoil = new CropSoil(
      this.siteCropId, this.expSite.expSiteId, this.cropId,
      _index, null, _unit, null, null, '1', '1', null, null, null, null, null, null, 'on', null, _value
    );

    this.cropSoilService.post(this.cropSoil)
      .subscribe(
        (val) => {
          this.cropSoil.soilId = val['result'];
          this.cropSoilList.push(this.cropSoil);
          this.myControl.setValue('');
        }
      );
    // } else {
    //   this.myControl.setValue('');
    // }
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
    // if (this.soilList.find(element => element.measurement === option)) {
    //   return true;
    // } else {
    return false;
    // }
  }

  remove(index: number) {
    this.cropSoilList.splice(index, 1);
  }
}
