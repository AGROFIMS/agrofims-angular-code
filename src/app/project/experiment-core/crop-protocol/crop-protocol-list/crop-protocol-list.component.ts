import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { CropProtocol } from '../model/crop-protocol';
import { CropProtocolService } from '../service/crop-protocol.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-crop-protocol-list',
  templateUrl: './crop-protocol-list.component.html',
  styleUrls: ['./crop-protocol-list.component.css']
})
export class CropProtocolListComponent implements OnInit, OnChanges {
  @Input() siteCrop: SiteCrop;

  itemList: any[] = [];
  item: any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  measurementList: { index: string, value: string, unit: string }[] = [];
  itemGroupList: string[] = [];

  constructor(
    private cropProtocolService: CropProtocolService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();
  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('management_practices')
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

  ngOnChanges() {
    this.getAll(this.siteCrop.siteCropId, this.siteCrop.cropId);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll(siteCropId: any, cropId: any) {
    return this.cropProtocolService
      .getById(siteCropId, cropId)
      .subscribe(
        (_itemList: CropProtocol[]) => {
          if (_itemList.length > 0) {
            this.itemGroupList = [
              ...new Set(
                _itemList
                  .map(
                    (item) =>
                      item.indexOrder + '|' +
                      item.siteCropId + '|' +
                      item.expSiteId + '|' +
                      item.studyVariableId + '|' +
                      item.cropId + '|' +
                      item.measurement
                  )
              )
            ];
            this.itemList = _itemList;
          }
        }
      );
  }

  remove(_index: number) {
    this.itemGroupList.splice(_index, 1);
  }

  post() {
    const _value = this.myControl.value;
    const _index = this.measurementList.find(element => element.value === _value.toString()).index;
    const _unit = this.measurementList.find(element => element.value === _value.toString()).unit;
    let newSortIndex = 1;

    if (this.itemList.length > 0) {
      newSortIndex = Math
        .max
        .apply(Math, (
          this.itemList
            .map(
              object => Number(object.indexOrder)
            )
        )) + 1;
    }

    this.item = new CropProtocol(
      this.siteCrop.siteCropId,
      this.siteCrop.expSiteId,
      _index,
      this.siteCrop.cropId,
      null, _unit, newSortIndex.toString(),
      'on', null, _value
    );

    this.cropProtocolService.post(this.item)
      .subscribe(
        (val) => {
          this.item.cropMeasurementId = val['result'];
          this.itemList.push(this.item);

          this.itemGroupList.push(
            this.item.indexOrder + '|' +
            this.item.siteCropId + '|' +
            this.item.expSiteId + '|' +
            this.item.studyVariableId + '|' +
            this.item.cropId + '|' +
            this.item.measurement
          );

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
    return optionList
      .filter(
        option => option
          .toLowerCase()
          .includes(filterValue)
      );
  }

}
