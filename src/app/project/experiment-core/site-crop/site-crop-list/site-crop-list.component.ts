import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SiteCropService } from '../service/site-crop.service';
import { SiteCrop } from '../model/site-crop';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import { FormControl } from '@angular/forms';
import { CropService } from '../../crop/service/crop.service';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';
import { ExpSite } from '../../exp-site/model/exp-site';

@Component({
  selector: 'app-site-crop-list',
  templateUrl: './site-crop-list.component.html',
  styleUrls: ['./site-crop-list.component.css']
})
export class SiteCropListComponent implements OnInit, OnChanges {
  @Input() expSite: ExpSite;
  @Input() siteCropList: SiteCrop[];
  @Input() experimentStartDate: string;
  @Input() countryName: any;

  siteCrop: SiteCrop;

  parameterList: Parameter[] = [];
  // croppingType = new FormControl();

  // mono_crop
  ec1 = '162';
  // inter_crop
  ec2 = '163';
  // relay_crop
  ec3 = '164';

  // siteCrop: SiteCrop;
  parameterVI: Parameter[] = [];


  formControlList = [];

  constructor(
    private siteCropService: SiteCropService,
    private expSiteService: ExpSiteService,
    private parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.getParameterList();
    this.getParameterVI();
  }

  ngOnChanges() {
  }

  selectCondition() {
    switch (this.expSite.croppingTypeId) {
      case this.ec1:
        const cropCommonName = this.siteCropList
          .filter(obj_1 => obj_1.croppingTypeId === this.ec1)[1].cropCommonName;
        if (cropCommonName) {
          this.expSite.fieldbookId =
            'FM' + cropCommonName.replace(' ', '_')
            + this.experimentStartDate.slice(0, 7).replace('-', '')
            + '_' + this.countryName.replace(' ', '_');
        } else {
          this.expSite.fieldbookId =
            'FM' + this.experimentStartDate.slice(0, 7).replace('-', '')
            + '_' + this.countryName.replace(' ', '_');
        }
        this.siteCropList.forEach((siteCrop) => {
          siteCrop.status = ((siteCrop.croppingTypeId === this.ec1) ? 'on' : 'off');
          this.siteCropService.put(siteCrop).subscribe();
        });
        break;
      case this.ec2:
        this.expSite.fieldbookId =
          'FInt' + this.experimentStartDate.slice(0, 7).replace('-', '')
          + '_' + this.countryName.replace(' ', '_');
        this.siteCropList.forEach((siteCrop) => {
          siteCrop.status = ((siteCrop.croppingTypeId === this.ec2) ? 'on' : 'off');
          this.siteCropService.put(siteCrop).subscribe();
        });
        break;
      case this.ec3:
        this.expSite.fieldbookId =
          'FRel' + this.experimentStartDate.slice(0, 7).replace('-', '')
          + '_' + this.countryName.replace(' ', '_');
        this.siteCropList.forEach((siteCrop) => {
          siteCrop.status = ((siteCrop.croppingTypeId === this.ec3) ? 'on' : 'off');
          this.siteCropService.put(siteCrop).subscribe();
        });
        break;
      default:
        break;
    }
    this.putExpSiteCropsOn(this.siteCropList);
  }

  putExpSiteCropsOn(siteCropList: SiteCrop[]) {
    this.expSite.siteCropsOn = siteCropList
      .filter(obj_1 => obj_1.croppingTypeId === this.expSite.croppingTypeId)
      .map(obj_2 =>
        obj_2.croppingTypeId + '.' + obj_2.siteCropId + '.' + obj_2.cropId + '.' + obj_2.cropCommonName +
        (obj_2.cropCommonName === 'Other' ? '-' + obj_2.cropCommonNameOther : '')
      )
      .join('|');
    this.putExpSite();
  }

  intercropArrangementChange() {
    this.siteCropList.forEach(siteCrop => {
      siteCrop.intercropValueRowCrop = null;
      this.siteCropService.put(siteCrop).subscribe();
    });
    this.expSite.intercropValueRowCrop = null;
    this.putExpSite();
  }

  putExpSite() {
    this.expSiteService
      .put(this.expSite)
      .subscribe();
  }

  post() {
    this.siteCrop = new SiteCrop(
      this.expSite.expSiteId,
      this.expSite.croppingTypeId === this.ec2 ? 'Crop common name' : 'Relay crop common name',
      null, null,
      this.expSite.croppingTypeId,
      null, null, null,
      'on');
    this.siteCropService.post(this.siteCrop)
      .subscribe(
        (val) => {
          this.siteCrop.siteCropId = val['result'];
          this.siteCropList
            .push(this.siteCrop);

          this.putExpSiteCropsOn(this.siteCropList);
        }
      );
  }

  remove(index: number) {
    this.siteCropList.splice(index, 1);
    this.updateFormControl(index);
    this.putExpSiteCropsOn(this.siteCropList);
  }

  getParameterList() {
    return this.parameterService
      .getAll('expSite', 'cropping_type')
      .subscribe((_parameter: Parameter[]) => this.parameterList = _parameter);
  }
  getParameterVI() {
    return this.parameterService
      .getAll('expSite', 'intercrop_arrangement')
      .subscribe((_parameter: Parameter[]) => this.parameterVI = _parameter);
  }

  updateFormControl(i: number) {
    const inputList: string[] = [];
    this.siteCropList.forEach(siteCrop => {
      if (siteCrop.croppingTypeId === '163' && siteCrop.intercropValueRowCrop) {
        inputList.push(siteCrop.intercropValueRowCrop);
        this.siteCropService.put(siteCrop).subscribe();
      }
    });
    this.expSite.intercropValueRowCrop = inputList.join('|');
    this.expSiteService
      .put(this.expSite)
      .subscribe();
  }

  inLimit(siteCropId: string): boolean {
    const itemList = this.siteCropList.filter(object => object.croppingTypeId === '163').map(object => object.siteCropId);
    const lastItem = itemList[itemList.length - 1];
    if (siteCropId === lastItem) {
      return false;
    } else {
      return true;
    }
  }
}


