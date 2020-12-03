import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';

@Component({
  selector: 'app-site-factor-edit-ii',
  templateUrl: './site-factor-edit-ii.component.html',
  styleUrls: ['./site-factor-edit-ii.component.css']
})
export class SiteFactorEditIiComponent implements OnInit, OnChanges {
  @Input() itemGroup: {
    indexOrder: string,
    siteFactorList: SiteFactor[],
    treatmentList: string[]
    factorNameMain: string,
  };
  @Input() siteFactor: SiteFactor;
  @Input() indexIG: number;
  @Input() index: string;
  // @Input() levelNameSelected: string[];
  @Input() expSite: ExpSite;

  levelNameSelected: string[] = [];
  factorUnitList: string[] = [];

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
    try {
      this.levelNameSelected = this.siteFactor.levelName.split('|');
    } catch (error) {
      this.levelNameSelected = [];
    }
    try {
      this.factorUnitList = this.siteFactor.factorUnitList.split('|');
    } catch (error) {
      this.factorUnitList = [];
    }

  }

  put() {
    this.siteFactorService
      .put(this.siteFactor)
      .subscribe();
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (input) {
      input.value = '';
    }
    if ((value || '').trim()) {
      const index = this.levelNameSelected.indexOf(value);
      if (index < 0) {
        this.levelNameSelected.push(value.trim());
        this.siteFactor.levelName = this.levelNameSelected.join('|');
        this.itemGroup.treatmentList = this.levelNameSelected;
        this.put();

      }
    }
  }

  removeChip(itemOther: string): void {
    const index = this.levelNameSelected.indexOf(itemOther);
    if (index >= 0) {
      this.levelNameSelected.splice(index, 1);
      this.siteFactor.levelName = this.levelNameSelected.length > 0 ? this.levelNameSelected.join('|') : null;
      this.itemGroup.treatmentList = this.levelNameSelected;
      this.verifyInTreatment(this.levelNameSelected);
      this.put();

    }
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

}
