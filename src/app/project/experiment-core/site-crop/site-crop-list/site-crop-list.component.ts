import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SiteCropService } from '../service/site-crop.service';
import { SiteCrop } from '../model/site-crop';
import { isNull } from 'util';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import { FormControl } from '@angular/forms';
import { Crop } from '../../crop/model/crop';
import { CropService } from '../../crop/service/crop.service';

@Component({
  selector: 'app-site-crop-list',
  templateUrl: './site-crop-list.component.html',
  styleUrls: ['./site-crop-list.component.css']
})
export class SiteCropListComponent implements OnInit {
  @Input() expSite: any;
  @Input() expSiteId: any;

  itemList: any[] = [];
  item: any;

  parameterV: Parameter[] = [];
  croppingType = new FormControl();

  // mono_crop
  ec1 = 162;
  // inter_crop
  ec2 = 163;
  // relay_crop
  ec3 = 164;


  siteCrop: SiteCrop;

  @Output() eventEmitterSiteCropList = new EventEmitter<SiteCrop[]>();

  constructor(
    private siteCropService: SiteCropService,
    private cropService: CropService,
    private parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.getAll(this.expSiteId);
    this.getParameterV();
  }

  getAll(expSiteId: any) {
    return this.siteCropService
      .getById(expSiteId)
      .subscribe(
        (_itemList: SiteCrop[]) => {
          this.itemList = _itemList;
          this.eventEmitterSiteCropList.emit(this.itemList);
          this.croppingType.setValue([...new Set(_itemList.map(item => item.croppingTypeId))][0]);
        }
      );
  }

  post() {
    this.item = new SiteCrop(
      this.expSite.expSiteId,
      this.expSite.experimentId,
      this.expSite.siteId,
      null, null, this.croppingType.value,
      null, null, null,
      'on');

    this.siteCropService.post(this.item)
      .subscribe(
        (val) => {
          this.item.siteCropId = val['result'];
          this.itemList.push(this.item);
          this.eventEmitterSiteCropList.emit(this.itemList);
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }

  catchEmitterSiteCropEdit($event) {
    this.siteCrop = $event;
    this.itemList[[...new Set(this.itemList.map(item => item.siteCropId))].indexOf(this.siteCrop.siteCropId)] = this.siteCrop;
    this.eventEmitterSiteCropList.emit(this.itemList);
  }

  getParameterV() {
    return this.parameterService
      .getAll('expSite', 'cropping_type')
      .subscribe((_parameter: Parameter[]) => this.parameterV = _parameter);
  }

  selectCondition() {
    switch (this.croppingType.value) {
      case this.ec1.toString(): this.post();
        break;
      case this.ec2.toString(): { this.post(); this.post(); }
        break;
      case this.ec3.toString(): { this.post(); this.post(); }
        break;
      default:
        break;
    }
  }

}
