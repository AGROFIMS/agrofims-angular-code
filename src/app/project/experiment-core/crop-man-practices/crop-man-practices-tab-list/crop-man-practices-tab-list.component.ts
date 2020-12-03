import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { ExpSite } from '../../exp-site/model/exp-site';

@Component({
  selector: 'app-crop-man-practices-tab-list',
  templateUrl: './crop-man-practices-tab-list.component.html',
  styleUrls: ['./crop-man-practices-tab-list.component.css']
})
export class CropManPracticesTabListComponent implements OnInit, OnChanges {
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
