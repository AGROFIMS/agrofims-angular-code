import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SiteCrop } from '../model/site-crop';
import { SiteCropListComponent } from '../site-crop-list/site-crop-list.component';
import { SiteCropService } from '../service/site-crop.service';
import { Crop } from '../../crop/model/crop';
import { CropService } from '../../crop/service/crop.service';

import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-site-crop-edit',
  templateUrl: './site-crop-edit.component.html',
  styleUrls: ['./site-crop-edit.component.css']
})
export class SiteCropEditComponent implements OnInit, OnChanges {
  @Input() index: any;
  @Input() siteCrop: SiteCrop;
  @Input() expSite: ExpSite;
  @Input() experimentStartDate: string;
  @Input() countryName: any;

  cropList: Crop[] = [];
  childCropList: Crop[] = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  chipsSelected: string[] = [];

  // mono_crop
  ec1 = '162';
  // inter_crop
  ec2 = '163';
  // relay_crop
  ec3 = '164';

  // cropId = new FormControl('', [Validators.required]);

  constructor(
    private siteCropService: SiteCropService,
    private compSiteCropList: SiteCropListComponent,
    private cropService: CropService,
    private expSiteService: ExpSiteService,
  ) { }

  ngOnInit(): void {
    this.getCropList();
  }

  ngOnChanges() {
    this.get();
  }

  get() {
    try {
      this.chipsSelected = this.siteCrop.varietyName.split('|');
    } catch (error) {
      this.chipsSelected = [];
    }
  }

  remove(siteCrop: SiteCrop): void {
    this.siteCropService
      .delete(siteCrop.siteCropId)
      .subscribe(() => this.compSiteCropList.remove(this.index));
  }

  put() {
    return this.siteCropService
      .put(this.siteCrop)
      .subscribe(
      );
  }

  getCropList() {
    return this.cropService.getAll()
      .subscribe(
        (_cropList: Crop[]) => {
          this.cropList = _cropList.filter(
            item => item.isFather === 'on'
          );
        }
      );
  }

  selectCrop($event: any) {
    const cropCommonName = this.cropList.filter(obj => obj.cropId === $event)[0].cropCommonName;
    this.siteCrop.cropCommonName = cropCommonName;
    this.siteCrop.cropLabel = cropCommonName;

    const siteCropsOnList = this.expSite.siteCropsOn.split('|');
    siteCropsOnList.forEach((siteCropOnElements, index) => {
      const siteCropCroppingTypeId = siteCropOnElements.split('.')[0];
      const siteCropId = siteCropOnElements.split('.')[1];
      const cropId = $event;
      if (siteCropId === this.siteCrop.siteCropId) {
        siteCropsOnList[index] = siteCropCroppingTypeId + '.' + siteCropId + '.' + cropId + '.' + cropCommonName;
      }
    });

    if (this.expSite.croppingTypeId === this.ec1) {
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
    }

    this.expSite.siteCropsOn = siteCropsOnList.join('|');
    this.putExpSite();

    this.cleanChildCrop();
    this.cleanCropCommonNameOther();
    this.put();
  }

  putExpSite() {
    this.expSiteService
      .put(this.expSite)
      .subscribe();
  }

  putOther($event: any) {


    const siteCropsOnList = this.expSite.siteCropsOn.split('|');



    siteCropsOnList.forEach((siteCropOnElements, index) => {
      const siteCropCroppingTypeId = siteCropOnElements.split('.')[0];
      const siteCropId = siteCropOnElements.split('.')[1];
      const cropId = siteCropOnElements.split('.')[2];
      if (cropId === '15' && this.siteCrop.siteCropId === siteCropId) {
        siteCropsOnList[index] = siteCropCroppingTypeId + '.' + siteCropId + '.' + cropId + '.' + 'Other-' + $event;
      }
    });



    this.expSite.siteCropsOn = siteCropsOnList.join('|');
    this.putExpSite();



    this.siteCrop.cropLabel = this.siteCrop.cropCommonName + ' | ' + $event;
    this.put();
  }

  selectChildCrop() {
    this.cleanCropCommonNameOther();
    this.put();
  }

  cleanChildCrop() {
    this.siteCrop.cropSonId = null;
  }

  cleanCropCommonNameOther() {
    this.siteCrop.cropCommonNameOther = null;
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.chipsSelected.indexOf(value);
      if (index < 0) {
        this.chipsSelected.push(value.trim());
        this.siteCrop.varietyName = this.chipsSelected.join('|');
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  removeChip(itemOther: string): void {
    const index = this.chipsSelected.indexOf(itemOther);
    if (index >= 0) {
      this.chipsSelected.splice(index, 1);
      this.siteCrop.varietyName = this.chipsSelected.length > 0 ? this.chipsSelected.join('|') : null;
      this.put();
    }
  }

}
