import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FactorService } from '../../factor/service/factor.service';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';

@Component({
  selector: 'app-site-factor-edit-i',
  templateUrl: './site-factor-edit-i.component.html',
  styleUrls: ['./site-factor-edit-i.component.css']
})

export class SiteFactorEditIComponent implements OnInit, OnChanges {
  @Input() itemGroup: {
    indexOrder: string,
    siteFactorList: SiteFactor[],
    treatmentList: string[]
    factorNameMain: string,
  };
  @Input() siteFactor: SiteFactor;
  @Input() indexIG: number;
  @Input() index: string;
  @Input() expSite: ExpSite;

  levelNameSelected: string[] = [];
  levelNameOtherSelected: string[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private siteFactorService: SiteFactorService,
    private expSiteService: ExpSiteService,
  ) { }

  ngOnChanges() {
    this.get();
  }

  ngOnInit(): void {
  }

  get() {
    if (this.siteFactor.levelName) {
      this.levelNameSelected = this.siteFactor.levelName.split('|');
    }
    if (this.siteFactor.levelNameOther) {
      this.levelNameOtherSelected = this.siteFactor.levelNameOther.split('|');
    }
    this.factorLevelNameChange();
  }

  factorLevelNameChange() {
    const _levelNameSelectedList = Object.assign([], this.levelNameSelected);
    const _levelNameOtherSelectedList = Object.assign([], this.levelNameOtherSelected);
    let _levelNameSelected: string;

    this.verifyInTreatment(_levelNameSelectedList);

    if (this.levelNameSelected.includes('Other')) {
      _levelNameSelected = _levelNameSelectedList.join('|');
      _levelNameSelectedList.splice(_levelNameSelectedList.indexOf('Other', 0), 1);
      this.itemGroup.treatmentList = _levelNameSelectedList.concat(_levelNameOtherSelectedList);
    } else {
      _levelNameSelected = _levelNameSelectedList.join('|');
      this.cleanLevelNameOtherSelected();
      this.itemGroup.treatmentList = _levelNameSelectedList;
    }

    this.siteFactor.levelName = _levelNameSelected;
    this.put();
  }

  verifyInTreatment(itemListSelected: string[]) {
    if (this.expSite.treatment) {
      const treatmentList = this.expSite.treatment.split('|');
      treatmentList.forEach((treatment, index) => {
        const levelNameList = treatment.split(' / ');
        const levelName = levelNameList[this.indexIG];
        if (levelName !== '-' && !itemListSelected.includes(levelName)) {
          levelNameList[this.indexIG] = '-';
          treatmentList[index] = levelNameList.join(' / ');
        }
      });

      this.expSite.treatment = treatmentList.join('|');
      this.expSiteService
        .put(this.expSite)
        .subscribe();
    }
  }

  cleanLevelNameOtherSelected() {
    if (this.levelNameOtherSelected.length > 0 || !this.siteFactor.levelNameOther) {
      this.levelNameOtherSelected = [];
      this.siteFactor.levelNameOther = null;
    }
  }

  put() {
    this.siteFactorService
      .put(this.siteFactor)
      .subscribe();
  }

  addOther(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (input) {
      input.value = '';
    }

    if ((value || '').trim()) {
      const index = this.levelNameOtherSelected.indexOf(value);
      if (index < 0) {
        this.levelNameOtherSelected.push(value.trim());
        this.siteFactor.levelNameOther = this.levelNameOtherSelected.join('|');
        this.factorLevelNameChange();
      }
    }

  }

  removeOther(itemOther: string): void {
    const index = this.levelNameOtherSelected.indexOf(itemOther);
    if (index >= 0) {
      this.levelNameOtherSelected.splice(index, 1);
      this.siteFactor.levelNameOther = this.levelNameOtherSelected.join('|');
      this.factorLevelNameChange();
    }
  }
}
