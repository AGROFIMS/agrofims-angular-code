import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { ExpSite } from '../../exp-site/model/exp-site';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';

@Component({
  selector: 'app-crop-fertilizer-tab-list',
  templateUrl: './crop-fertilizer-tab-list.component.html',
  styleUrls: ['./crop-fertilizer-tab-list.component.css']
})
export class CropFertilizerTabListComponent implements OnInit, OnChanges {
  @Input() siteCropList: SiteCrop[];
  @Input() expSite: ExpSite;

  tabList: {
    croppingTypeId: string,
    siteCropId: string,
    siteCrop: SiteCrop,
    label: string,
  }[] = [];

  unitList: Parameter[] = [];

  constructor(
    private parameterService: ParameterService,) { }

  ngOnInit(): void {
    this.getUnitList();
  }

  ngOnChanges() {
  }

  getUnitList() {
    return this.parameterService
      .getAll('fertilizer', 'unit')
      .subscribe((_parameter: Parameter[]) => this.unitList = _parameter);
  }


}
