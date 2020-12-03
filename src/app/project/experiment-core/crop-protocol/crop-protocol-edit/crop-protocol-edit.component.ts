import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { CropProtocolService } from '../service/crop-protocol.service';
import { CropProtocolListComponent } from '../crop-protocol-list/crop-protocol-list.component';
import { CropProtocol } from '../model/crop-protocol';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { FormControl } from '@angular/forms';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { isNull } from 'util';

@Component({
  selector: 'app-crop-protocol-edit',
  templateUrl: './crop-protocol-edit.component.html',
  styleUrls: ['./crop-protocol-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CropProtocolEditComponent implements OnInit, OnChanges {
  @Input() itemGroup: string;
  @Input() indexGroup: any;

  itemList: any[] = [];
  item: any;

  indexOrder: string;
  siteCropId: string;
  expSiteId: string;
  studyVariableId: string;
  cropId: string;
  measurement: string;

  variableDataType: string;
  defaultVariableValue: string;
  variableUnitList: string[] = [];
  variableCategoryList: string[] = [];
  meaTimeList: string[] = [];

  constructor(
    private cropProtocolService: CropProtocolService,
    private compCropProtocolList: CropProtocolListComponent,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getAll();
    this.getMeasurement();
  }

  getMeasurement() {
    return this.studyVariableService
      .get(this.studyVariableId)
      .subscribe(
        (_measurement: StudyVariable) => {

          this.variableDataType = _measurement.variableDataType;

          this.defaultVariableValue = _measurement.defaultVariableValue;

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
            this.meaTimeList = _measurement.meaTime.split('|');
          } catch (error) {
            this.meaTimeList = [];
          }


        }
      );
  }

  getAll() {
    const indexOrder = this.itemGroup.split('|')[0]; this.indexOrder = indexOrder;
    const siteCropId = this.itemGroup.split('|')[1]; this.siteCropId = siteCropId;
    const expSiteId = this.itemGroup.split('|')[2]; this.expSiteId = expSiteId;
    const studyVariableId = this.itemGroup.split('|')[3]; this.studyVariableId = studyVariableId;
    const cropId = this.itemGroup.split('|')[4]; this.cropId = cropId;
    const measurement = this.itemGroup.split('|')[5]; this.measurement = measurement;

    return this.cropProtocolService
      .getById(siteCropId, cropId)
      .subscribe(
        (_itemList: CropProtocol[]) => {
          this.itemList = _itemList.
            filter(
              object => object.indexOrder === indexOrder
            );
        }
      );
  }

  post() {
    const indexOrder = this.itemGroup.split('|')[0];
    const siteCropId = this.itemGroup.split('|')[1];
    const expSiteId = this.itemGroup.split('|')[2];
    const studyVariableId = this.itemGroup.split('|')[3];
    const cropId = this.itemGroup.split('|')[4];
    const measurement = this.itemGroup.split('|')[5];

    this.item = new CropProtocol(
      siteCropId,
      expSiteId,
      studyVariableId,
      cropId,
      null,
      this.defaultVariableValue,
      indexOrder,
      'on',
      null, measurement
    );

    this.cropProtocolService.post(this.item)
      .subscribe(
        (val) => {
          this.item.cropProtocolId = val['result'];
          this.itemList.push(this.item);
        }
      );
  }

  removeItem(_index: number): void {
    this.itemList.splice(_index, 1);
  }

  remove(_cropProtocol: CropProtocol, _index: number): void {
    this.cropProtocolService
      .delete(_cropProtocol.cropProtocolId)
      .subscribe(() => {
        this.removeItem(_index);
      });
  }

  dateChange(_cropProtocol: CropProtocol, $event) {
    _cropProtocol.value = $event.value.toISOString().slice(0, 19).replace('T', ' ');
    this.put(_cropProtocol);
  }

  put(_cropProtocol: CropProtocol) {
    this.cropProtocolService
      .put(_cropProtocol)
      .subscribe();
  }

  removeItemList(): void {
    this.itemList.forEach(element => {
      this.cropProtocolService
        .delete(element.cropProtocolId)
        .subscribe();
    });
    this.compCropProtocolList.remove(this.indexGroup);
  }

  getDateInit(_cropProtocol: CropProtocol): FormControl {
    const dateInit = new FormControl();
    if (!isNull(_cropProtocol.value) && this.variableDataType === 'DATE') {
      dateInit.setValue(new Date(_cropProtocol.value).toISOString());
    }
    return dateInit;
  }


}

