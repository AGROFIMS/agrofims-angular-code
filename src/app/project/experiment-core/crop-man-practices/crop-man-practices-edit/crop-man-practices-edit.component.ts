import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CropManPractices } from '../model/crop-man-practices';
import { CropManPracticesService } from '../service/crop-man-practices.service';
import { CropManPracticesListComponent } from '../crop-man-practices-list/crop-man-practices-list.component';

@Component({
  selector: 'app-crop-man-practices-edit',
  templateUrl: './crop-man-practices-edit.component.html',
  styleUrls: ['./crop-man-practices-edit.component.css']
})
export class CropManPracticesEditComponent implements OnInit, OnChanges {
  @Input() cropManPracticesGroup: {
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
    attrMnMsr: boolean
    attrOthNnm: string,
  };

  @Input() index: any;

  constructor(
    private cropManPracticesService: CropManPracticesService,
    private compCropManPracticesList: CropManPracticesListComponent,
  ) { }

  ngOnInit(): void { }

  ngOnChanges() {
  }

  post() {
    const indexOrder = this.cropManPracticesGroup.indexOrder;
    const siteCropId = this.cropManPracticesGroup.attrStCrpId;
    const expSiteId = this.cropManPracticesGroup.attrExpSId;
    const studyVariableId = this.cropManPracticesGroup.attrStdVId;
    const cropId = this.cropManPracticesGroup.attrCrpId;
    const croppingTypeId = this.cropManPracticesGroup.attrCrpTp;
    const groupManPractices = this.cropManPracticesGroup.attrGrpMnPr;
    const manPracticeType = this.cropManPracticesGroup.attrMnPrTp;
    const measurement = this.cropManPracticesGroup.measurement;
    const protocol = this.cropManPracticesGroup.attrPrtcl ? 'on' : 'off';
    const managementMeasurement = this.cropManPracticesGroup.attrMnMsr ? 'on' : 'off';
    const valueOther = this.cropManPracticesGroup.attrOthNnm;

    const cropManPractices = new CropManPractices(
      siteCropId,
      expSiteId,
      studyVariableId,
      groupManPractices,
      cropId,
      croppingTypeId,
      null,
      valueOther,
      manPracticeType,
      null,
      indexOrder,
      protocol, managementMeasurement, 'on',
      null, measurement
    );

    this.cropManPracticesService.post(cropManPractices)
      .subscribe(
        (val) => {
          cropManPractices.cropManPracticesId = val['result'];
          this.cropManPracticesGroup.cropManPracticesList.push(cropManPractices);
        }
      );
  }

  removeItem(index: number): void {
    this.cropManPracticesGroup.cropManPracticesList.splice(index, 1);
  }

  removeItemList(): void {
    this.cropManPracticesGroup.cropManPracticesList.forEach(element => {
      this.cropManPracticesService
        .delete(element.cropManPracticesId)
        .subscribe();
    });
    this.compCropManPracticesList.remove(this.index);
  }

  putPrtcl($event: any) {
    this.cropManPracticesGroup.cropManPracticesList.forEach(element => {
      element.protocol = $event ? 'on' : 'off';
      this.cropManPracticesService
        .put(element)
        .subscribe();
    });
  }

  putMnMsr($event: any) {
    this.cropManPracticesGroup.cropManPracticesList.forEach(element => {
      element.managementMeasurement = $event ? 'on' : 'off';
      this.cropManPracticesService
        .put(element)
        .subscribe();
    });
  }

  putOthNnm() {
    this.cropManPracticesGroup.cropManPracticesList.forEach(element => {
      element.valueOther = this.cropManPracticesGroup.attrOthNnm;
      this.cropManPracticesService
        .put(element)
        .subscribe();
    });
  }

}
