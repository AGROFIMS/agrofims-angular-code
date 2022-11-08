import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { CropManPractices } from '../model/crop-man-practices';
import { CropManPracticesService } from '../service/crop-man-practices.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ExpSite } from '../../exp-site/model/exp-site';

@Component({
  selector: 'app-crop-man-practices-list',
  templateUrl: './crop-man-practices-list.component.html',
  styleUrls: ['./crop-man-practices-list.component.css']
})
export class CropManPracticesListComponent implements OnInit, OnChanges {
  @Input() siteCropList: SiteCrop[];
  @Input() expSite: ExpSite;
  @Input() indexCrop: number;

  itemListBase_2: {
    index: string,
    value: string,
    group: string,
    unit: string,
  }[] = [];

  cropManPracticesGroupList: {
    indexOrder: string,
    cropManPracticesList: CropManPractices[],
    measurement: string,
    attrStCrpId: string,
    attrExpSId: string,
    attrStdVId: string,
    attrCrpId: string,
    attrCrpTp: string,
    attrGrpMnPr: string,
    attrMnPrTp: string,
    attrPrtcl: boolean,
    attrMnMsr: boolean,
    attrOthNnm: string,
  }[] = [];

  itemList_1: string[];
  itemList_2: Observable<string[]>;

  myControl = new FormControl();
  itemListSelected = [];



  constructor(
    private cropManPracticesService: CropManPracticesService,
    private studyVariableService: StudyVariableService,
  ) { }


  getItemList_1() {
    return this.studyVariableService
      .getById('management_practices')
      .subscribe(
        (_measurementList: StudyVariable[]) => {
          this.itemList_1 = [
            ... new Set(
              _measurementList
                .map(
                  object =>
                    object.group
                )
            )
          ];
        }
      );
  }
  getItemListBase_2() {
    return this.studyVariableService
      .getById('management_practices')
      .subscribe(
        (_measurementList: StudyVariable[]) => {
          _measurementList
            .forEach(element => {
              const index = element.studyVariableId;
              const value = element.measurement;
              const group = element.group;
              const unit = element.defaultVariableValue;
              const measurement: {
                index: string,
                value: string,
                group: string,
                unit: string
              } = {
                index,
                value,
                group,
                unit
              };
              this.itemListBase_2.push(measurement);
            });
          this.myControl.setValue('');
        }
      );
  }

  ngOnChanges() {
    this.getAll();
  }

  ngOnInit(): void {
    this.getItemList_1();
    this.itemList_2 = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll() {

    return this.cropManPracticesService
      .getById(this.expSite.expSiteId)
      .subscribe(
        (_cropManPracticesList: CropManPractices[]) => {

          this.getItemListBase_2();

          let cropManPracticesListFiltered: CropManPractices[];

          cropManPracticesListFiltered = _cropManPracticesList
            .filter(obj1 => obj1.croppingTypeId === this.expSite.croppingTypeId)
            .filter(obj2 => obj2.siteCropId === this.expSite.siteCropsOn.split('|')[this.indexCrop].split('.')[1]
            );

          if (cropManPracticesListFiltered.length > 0) {
            if (cropManPracticesListFiltered[0].groupManPractices) {
              this.itemListSelected = cropManPracticesListFiltered[0].groupManPractices.split('|');
            }
          }

          const indexOrderList = [
            ... new Set(
              cropManPracticesListFiltered
                .map(
                  object =>
                    object.indexOrder
                )
            )
          ];

          this.cropManPracticesGroupList = [];
          indexOrderList.forEach(indexOrderItem => {
            const indexOrder = indexOrderItem;
            const cropManPracticesList = cropManPracticesListFiltered.filter(option => option.indexOrder === indexOrderItem);

            const measurement = cropManPracticesList[0].measurement;
            const attrStCrpId = cropManPracticesList[0].siteCropId;
            const attrExpSId = cropManPracticesList[0].expSiteId;
            const attrStdVId = cropManPracticesList[0].studyVariableId;
            const attrCrpId = cropManPracticesList[0].cropId;
            const attrCrpTp = cropManPracticesList[0].croppingTypeId;
            const attrGrpMnPr = cropManPracticesList[0].groupManPractices;
            const attrMnPrTp = cropManPracticesList[0].manPracticeType;
            const attrPrtcl = cropManPracticesList[0].protocol === 'on' ? true : false;
            const attrMnMsr = cropManPracticesList[0].managementMeasurement === 'on' ? true : false;
            const attrOthNnm = cropManPracticesList[0].valueOther;

            const itemCropManPracticesGroup: {
              indexOrder: string,
              cropManPracticesList: CropManPractices[],
              measurement: string,
              attrStCrpId: string,
              attrExpSId: string,
              attrStdVId: string,
              attrCrpId: string,
              attrCrpTp: string,
              attrGrpMnPr: string,
              attrMnPrTp: string,
              attrPrtcl: boolean,
              attrMnMsr: boolean,
              attrOthNnm: string
            } = {
              indexOrder,
              cropManPracticesList,
              measurement,
              attrStCrpId,
              attrExpSId,
              attrStdVId,
              attrCrpId,
              attrCrpTp,
              attrGrpMnPr,
              attrMnPrTp,
              attrPrtcl,
              attrMnMsr,
              attrOthNnm
            };

            this.cropManPracticesGroupList.push(itemCropManPracticesGroup);
          });
        }
      );
  }

  remove(index: number) {
    this.cropManPracticesGroupList.splice(index, 1);
  }

  post() {
    const _value = this.myControl.value;
    const _index = this.itemListBase_2.find(element => element.value === _value.toString()).index;
    const _unit = this.itemListBase_2.find(element => element.value === _value.toString()).unit;

    let newIndexOrder = 1;

    if (this.cropManPracticesGroupList.length > 0) {
      newIndexOrder = Math
        .max
        .apply(Math, (
          this.cropManPracticesGroupList
            .map(
              object => Number(object.indexOrder)
            )
        )) + 1;
    }

    let _siteCropId: string;
    try {
      _siteCropId = this.expSite.siteCropsOn.split('|')[this.indexCrop].split('.')[1];
    } catch (error) {
      _siteCropId = null;
    }

    let _cropId: string;
    try {
      _cropId = this.expSite.siteCropsOn.split('|')[this.indexCrop].split('.')[2];
    } catch (error) {
      _cropId = null;
    }

    const _croppingTypeId = this.expSite.croppingTypeId;
    const _groupManPractices = this.itemListSelected.join('|');
    const _manPracticeType = _value === 'Other' ? 'text|text+units|date' : 'plot';

    const cropManPractices = new CropManPractices(
      _siteCropId,
      this.expSite.expSiteId,
      _index,
      _groupManPractices,
      _cropId, _croppingTypeId,
      null, null, _manPracticeType, _unit, newIndexOrder.toString(),
      'off', 'on', 'on',
      null, _value
    );

    this.cropManPracticesService.post(cropManPractices)
      .subscribe(
        (val) => {
          cropManPractices.cropManPracticesId = val['result'];
          const indexOrder = newIndexOrder.toString();
          const cropManPracticesList = [];

          cropManPracticesList.push(cropManPractices);
          const measurement = _value;
          const attrStCrpId = cropManPractices.siteCropId;
          const attrExpSId = cropManPractices.expSiteId;
          const attrStdVId = cropManPractices.studyVariableId;
          const attrCrpId = cropManPractices.cropId;
          const attrCrpTp = cropManPractices.croppingTypeId;
          const attrGrpMnPr = cropManPractices.groupManPractices;
          const attrMnPrTp = cropManPractices.manPracticeType;
          const attrPrtcl = cropManPractices.protocol === 'on' ? true : false;
          const attrMnMsr = cropManPractices.managementMeasurement === 'on' ? true : false;
          const attrOthNnm = cropManPractices.valueOther;

          const itemCropManPracticesGroup: {
            indexOrder: string,
            cropManPracticesList: CropManPractices[],
            measurement: string,
            attrStCrpId: string,
            attrExpSId: string,
            attrStdVId: string,
            attrCrpId: string,
            attrCrpTp: string,
            attrGrpMnPr: string,
            attrMnPrTp: string,
            attrPrtcl: boolean,
            attrMnMsr: boolean,
            attrOthNnm: string
          } = {
            indexOrder,
            cropManPracticesList,
            measurement,
            attrStCrpId,
            attrExpSId,
            attrStdVId,
            attrCrpId,
            attrCrpTp,
            attrGrpMnPr,
            attrMnPrTp,
            attrPrtcl,
            attrMnMsr,
            attrOthNnm
          };
          this.cropManPracticesGroupList.push(itemCropManPracticesGroup);
          this.myControl.setValue('');
        }
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.itemListBase_2.forEach(element => {
      if (this.itemListSelected.includes(element.group)) {
        optionList.push(element.value);
      }
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  itemsSelection() {
    if (this.cropManPracticesGroupList.length > 0) {
      this.cropManPracticesGroupList.forEach(element1 => {
        element1.cropManPracticesList.forEach(element2 => {
          element2.groupManPractices = this.itemListSelected.join('|');
          this.cropManPracticesService.put(element2).subscribe(
            () => this.myControl.setValue('')
          );
        });
      });
    } else {
      this.myControl.setValue('');
    }
  }

  findElement(option: any): boolean {
    if (this.cropManPracticesGroupList.map(obj => obj.measurement).find(element => element === option)) {
      if (option === 'Other') {
        return false;
      } else {
        return true;
      }

    } else {
      return false;
    }
  }

}
