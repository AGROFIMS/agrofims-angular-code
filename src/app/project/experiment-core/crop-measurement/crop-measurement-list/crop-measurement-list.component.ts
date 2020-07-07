import { Component, OnInit, Input } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { CropMeasurement } from '../model/crop-measurement';
import { CropMeasurementService } from '../service/crop-measurement.service';
import { ParameterService } from '../../parameter/service/parameter.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { FormControl } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-crop-measurement-list',
  templateUrl: './crop-measurement-list.component.html',
  styleUrls: ['./crop-measurement-list.component.css']
})
export class CropMeasurementListComponent implements OnInit {
  @Input() siteCrop: SiteCrop;

  itemList: any[] = [];
  item: any;
  measurementList: any[] = [];
  studyVariable = new FormControl();

  constructor(
    private cropMeasurementService: CropMeasurementService,
    private parameterService: ParameterService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getAll(this.siteCrop.siteCropId);

    this.getMeasurementList();
  }

  getAll(siteCropId: any) {
    return this.cropMeasurementService
      .getById(siteCropId)
      .subscribe(
        (_itemList: CropMeasurement[]) => {
          this.itemList = _itemList;
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }

  post() {
    const _studyVariableId = this.studyVariable.value.studyVariableId;
    const _measurement = this.studyVariable.value.measurement;

    this.item = new CropMeasurement(this.siteCrop.siteCropId, this.siteCrop.expSiteId, this.siteCrop.experimentId, this.siteCrop.siteId,
      _studyVariableId, null, null, null, null, null, null, null, null, null, null, 'on', null, _measurement);

    this.cropMeasurementService.post(this.item)
      .subscribe(
        (val) => {
          this.item.cropMeasurementId = val['result'];

          this.itemList.push(this.item);
        }
      );
  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('crop_measurement')
      .subscribe(
        (_measurementList: StudyVariable[]) => {
          this.measurementList = _measurementList.filter(
            item => item.cropName.trim() === this.siteCrop.cropCommonName.trim()
          );
        }
      );
  }

}
