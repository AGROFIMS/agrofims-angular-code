import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { ExpSite } from '../../exp-site/model/exp-site';
import { CropMeasurement } from '../model/crop-measurement';

@Component({
  selector: 'app-crop-measurement-tab-list',
  templateUrl: './crop-measurement-tab-list.component.html',
  styleUrls: ['./crop-measurement-tab-list.component.css']
})
export class CropMeasurementTabListComponent implements OnInit, OnChanges {
  @Input() siteCropList: SiteCrop[];
  @Input() expSite: ExpSite;
  @Input() cropMeasurementList: CropMeasurement[];


  tabList: {
    croppingTypeId: string,
    siteCropId: string,
    siteCrop: SiteCrop,
    label: string,
  }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

}
