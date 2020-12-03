import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';

@Component({
  selector: 'app-site-factor-edit-v',
  templateUrl: './site-factor-edit-v.component.html',
  styleUrls: ['./site-factor-edit-v.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SiteFactorEditVComponent implements OnInit, OnChanges {
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
  itemSelectedList: string[] = [];
  dateFormControlList = [];
  levelNameSelected: string[] = [];


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
      this.itemSelectedList = this.siteFactor.levelName.split('|');
    } catch (error) {
      this.itemSelectedList = [];
    }
    try {
      const timingDateList: string[] = this.siteFactor.timingDate.split('|');
      timingDateList.forEach(timingDate => {
        const _timingDate = new Date(timingDate + ' 00:00:00').toISOString();
        const dateFormControl = new FormControl(_timingDate);
        this.dateFormControlList.push(dateFormControl);
      });
    } catch (error) {
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

  put() {
    this.siteFactorService
      .put(this.siteFactor)
      .subscribe();
  }

  timingChange() {
    this.itemSelectedList = [];
    this.siteFactor.timingDaysAfterPlanting = null;
    this.siteFactor.timingFrequency = null;
    this.siteFactor.timingDate = null;
    this.siteFactor.timingGrowthStage = null;
    this.siteFactor.timingOther = null;
    this.siteFactor.levelName = null;
    this.dateFormControlList = [];
    this.itemGroup.treatmentList = [];
    this.verifyInTreatment(this.itemGroup.treatmentList);
    if (this.siteFactor.timing === 'Date') {
      this.addDate();
    } else {
      this.put();
    }
  }

  addTiming(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.itemSelectedList.indexOf(value);
      if (index < 0) {
        this.itemSelectedList.push(value.trim());
        if (this.siteFactor.timing === 'Days after planting') {
          this.siteFactor.timingDaysAfterPlanting = this.itemSelectedList.join('|');
          this.siteFactor.levelName = this.itemSelectedList.join('|');
        } else if (this.siteFactor.timing === 'Date') {
          this.siteFactor.timingDate = this.itemSelectedList.join('|');
          this.siteFactor.levelName = this.itemSelectedList.join('|');
        } else if (this.siteFactor.timing === 'Growth stage') {
          this.siteFactor.timingGrowthStage = this.itemSelectedList.join('|');
          this.siteFactor.levelName = this.itemSelectedList.join('|');
        } else if (this.siteFactor.timing === 'Other') {
          this.siteFactor.timingOther = this.itemSelectedList.join('|');
          this.siteFactor.levelName = this.itemSelectedList.join('|');
        }
        this.itemGroup.treatmentList = this.itemSelectedList;
      }
    } else if (this.siteFactor.timing === 'Frequency') {
      this.siteFactor.levelName = this.siteFactor.timingFrequency;
      this.itemGroup.treatmentList = [this.siteFactor.timingFrequency];
      this.verifyInTreatment(this.itemGroup.treatmentList);
    }

    this.put();
    if (input) {
      input.value = '';
    }
  }

  removeTiming(itemOther: string): void {
    const index = this.itemSelectedList.indexOf(itemOther);
    if (index >= 0) {
      this.itemSelectedList.splice(index, 1);
      if (this.siteFactor.timing === 'Days after planting') {
        this.siteFactor.timingDaysAfterPlanting = this.itemSelectedList.join('|');
      } else if (this.siteFactor.timing === 'Date') {
        this.siteFactor.timingDate = this.itemSelectedList.join('|');
      } else if (this.siteFactor.timing === 'Growth stage') {
        this.siteFactor.timingGrowthStage = this.itemSelectedList.join('|');
      } else if (this.siteFactor.timing === 'Other') {
        this.siteFactor.timingOther = this.itemSelectedList.join('|');
      }
      this.siteFactor.levelName = this.itemSelectedList.join('|');
      this.itemGroup.treatmentList = this.itemSelectedList;
      this.verifyInTreatment(this.itemGroup.treatmentList);
      this.put();
    }
  }

  addDate() {
    const dateNow: Date = new Date(Date.now());
    const dateFormControl = new FormControl(dateNow.toISOString());
    const timingDateList: string[] = [];
    this.dateFormControlList.push(dateFormControl);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 10));
    });
    this.siteFactor.timingDate = timingDateList.join('|');
    this.siteFactor.levelName = timingDateList.join('|');
    this.itemGroup.treatmentList = timingDateList;
    this.put();
  }
  removeDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList.splice(i, 1);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 10));
    });
    this.siteFactor.timingDate = timingDateList.join('|');
    this.siteFactor.levelName = timingDateList.join('|');
    this.itemGroup.treatmentList = timingDateList;
    this.verifyInTreatment(this.itemGroup.treatmentList);
    this.put();
  }
  updateDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList[i].setValue(this.dateFormControlList[i].value.toISOString());
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 10));
    });
    this.siteFactor.timingDate = timingDateList.join('|');
    this.siteFactor.levelName = timingDateList.join('|');
    this.itemGroup.treatmentList = timingDateList;
    this.verifyInTreatment(this.itemGroup.treatmentList);
    this.put();
  }

}
