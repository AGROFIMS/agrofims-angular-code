import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SiteCrop } from '../model/site-crop';
import { SiteCropListComponent } from '../site-crop-list/site-crop-list.component';
import { SiteCropService } from '../service/site-crop.service';
import { Crop } from '../../crop/model/crop';
import { CropService } from '../../crop/service/crop.service';

@Component({
  selector: 'app-site-crop-edit',
  templateUrl: './site-crop-edit.component.html',
  styleUrls: ['./site-crop-edit.component.css']
})
export class SiteCropEditComponent implements OnInit {
  @Input() siteCropId: any;
  @Input() index: any;

  cropList: Crop[] = [];
  childCropList: Crop[] = [];

  siteCrop: SiteCrop = new SiteCrop('', '', '', '', '', '', '', '', '', 'on');

  @Output() eventEmitterSiteCropEdit = new EventEmitter<SiteCrop>();

  constructor(
    private siteCropService: SiteCropService,
    private compSiteCropList: SiteCropListComponent,
    private cropService: CropService,
  ) { }

  ngOnInit(): void {
    this.get(this.siteCropId);
    this.getCropList();
    this.getChildCropList();
  }

  get(siteCropId: any) {
    return this.siteCropService
      .get(siteCropId)
      .subscribe(
        (_siteCrop: SiteCrop) => {
          this.siteCrop = _siteCrop;
        });
  }

  remove(siteCrop: SiteCrop): void {
    this.siteCropService
      .delete(siteCrop.siteCropId)
      .subscribe(() => this.compSiteCropList.remove(this.index));

  }

  put() {
    return this.siteCropService
      .put(this.siteCrop)
      .subscribe(() =>
        this.siteCropService
          .get(this.siteCrop.siteCropId)
          .subscribe(
            (_siteCrop: SiteCrop) => this.eventEmitterSiteCropEdit.emit(_siteCrop)
          )
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

  getChildCropList() {
    return this.cropService.getAll()
      .subscribe(
        (_cropList: Crop[]) => {
          this.childCropList = _cropList.filter(
            item => item.isFather === 'off' && item.fatherCropId === this.siteCrop.cropId
          );
        }
      );
  }

  selectCrop() {
    this.cleanChildCrop();
    this.cleanCropCommonNameOther();
    this.getChildCropList();
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

}
