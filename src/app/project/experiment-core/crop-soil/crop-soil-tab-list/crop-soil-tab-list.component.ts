import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Component({
  selector: 'app-crop-soil-tab-list',
  templateUrl: './crop-soil-tab-list.component.html',
  styleUrls: ['./crop-soil-tab-list.component.css']
})
export class CropSoilTabListComponent implements OnInit, OnChanges {
  @Input() siteCropList: SiteCrop[];
  @Input() expSite: ExpSite;

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
