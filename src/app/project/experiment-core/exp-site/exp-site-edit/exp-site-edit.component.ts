import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SiteService } from '../../site/service/site.service';
import { ExpSite } from '../model/exp-site';
import { ExpSiteService } from '../service/exp-site.service';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../../site/model/site';
import { Experiment } from '../../experiment/model/experiment';
import { ExperimentService } from '../../experiment/service/experiment.service';
import { SiteCropListComponent } from '../../site-crop/site-crop-list/site-crop-list.component';
import { SiteCrop } from '../../site-crop/model/site-crop';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  providers: [SiteCropListComponent],
  selector: 'app-exp-site-edit',
  templateUrl: './exp-site-edit.component.html',
  styleUrls: ['./exp-site-edit.component.css']
})
export class ExpSiteEditComponent implements OnInit {

  expId: string;
  expSiteNameId: string;
  siteIList: any[];
  siteIIList: any[];
  site = new Site(null, null, null, null, null, null, null, null, null, null, null, null, null, 'on');
  expSite = new ExpSite(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'on');
  countryName = new FormControl();
  parameterI: Parameter[] = [];
  parameterII: Parameter[] = [];
  parameterIII: Parameter[] = [];
  parameterIV: Parameter[] = [];
  parameterV: Parameter[] = [];
  parameterVI: Parameter[] = [];

  itemList: SiteCrop[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];
  itemsOtherSelected: string[] = [];
  items: string[] = [
    'Crops',
    'Forest',
    'Grassland',
    'Savanna',
    'Shrubs',
    'Woodland',
    'Other'
  ];

  constructor(
    private siteService: SiteService,
    private expSiteService: ExpSiteService,
    private experimentService: ExperimentService,
    private parameterService: ParameterService,
    private compSiteCropList: SiteCropListComponent,
    private route: ActivatedRoute
  ) { }


  catchEmitterSiteCropList($event) {
    this.itemList = $event;
  }

  ngOnInit(): void {
    const expSiteId = this.route.snapshot.paramMap.get('id');
    this.get(expSiteId);
    this.getSiteI();
    this.getParameterI();
    this.getParameterII();
    this.getParameterIII();
    this.getParameterIV();
    this.getParameterV();
    this.getParameterVI();
  }

  get(expSiteId: any) {
    return this.expSiteService
      .get(expSiteId)
      .subscribe((_expSite: ExpSite) => {

        try {
          this.itemsSelected = _expSite.inSiteVegetation.split('|');
        } catch (error) {
        }

        try {
          this.itemsOtherSelected = _expSite.inSiteVegetationOther.split('|');
        } catch (error) {
        }

        this.expSite = _expSite;
        this.getExperiment(_expSite.experimentId);
        this.siteService.get(_expSite.siteId).subscribe((_site: Site) => {
          this.site = _site;
          this.expSiteNameId = _site.countryName + ' - ' + _site.name + ' (' + _site.sId + ')';
          this.countryName.setValue(_site.countryName);
          this.getSiteII();
        });
      });
  }

  getSiteI() {
    return this.siteService
      .getAll()
      .subscribe((_siteIList: any[]) => {
        this.siteIList = [...new Set(_siteIList.map(item => item.countryName))];
      });
  }

  getSiteII() {
    return this.siteService
      .getAll()
      .subscribe((_siteIIList: any[]) => {
        this.siteIIList = _siteIIList.filter(
          item => item.countryName === this.countryName.value
        );
      });
  }

  put() {
    this.expSite.inSiteVegetation = this.itemsSelected
      .join('|');

    this.expSiteService
      .put(this.expSite)
      .subscribe();
  }

  getParameterI() {
    return this.parameterService
      .getAll('expSite', 'high_level')
      .subscribe((_parameter: Parameter[]) => this.parameterI = _parameter);
  }

  getParameterII() {
    return this.parameterService
      .getAll('expSite', 'site_vegetation')
      .subscribe((_parameter: Parameter[]) => this.parameterII = _parameter);
  }

  getParameterIII() {
    return this.parameterService
      .getAll('expSite', 'soil_class_system')
      .subscribe((_parameter: Parameter[]) => this.parameterIII = _parameter);
  }

  getParameterIV() {
    return this.parameterService
      .getAll('expSite', 'fao_soil_class_group')
      .subscribe((_parameter: Parameter[]) => this.parameterIV = _parameter);
  }

  getParameterV() {
    return this.parameterService
      .getAll('expSite', 'usda_soil_class_group')
      .subscribe((_parameter: Parameter[]) => this.parameterV = _parameter);
  }

  getParameterVI() {
    return this.parameterService
      .getAll('expSite', 'intercrop_arrangement')
      .subscribe((_parameter: Parameter[]) => this.parameterVI = _parameter);
  }

  getExperiment(experimentId: string) {
    return this.experimentService
      .get(experimentId)
      .subscribe((_experiment: Experiment) =>
        this.expId = _experiment.expId);
  }

  inSiteVegetationClear() {
    if (!this.itemsSelected.includes('Other')) {
      this.itemsOtherSelected = [];
      this.expSite.inSiteVegetationOther = null;
    }
    this.put();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.itemsOtherSelected.indexOf(value);
      if (index < 0) {
        this.itemsOtherSelected.push(value.trim());
        this.expSite.inSiteVegetationOther = this.itemsOtherSelected.join('|');
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  remove(itemOther: string): void {
    const index = this.itemsOtherSelected.indexOf(itemOther);
    if (index >= 0) {
      this.itemsOtherSelected.splice(index, 1);
      this.expSite.inSiteVegetationOther = this.itemsOtherSelected.join('|');
      this.put();
    }
  }
}
