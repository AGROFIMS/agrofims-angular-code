import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FactorService } from '../../factor/service/factor.service';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';

@Component({
  selector: 'app-site-factor-edit-iii',
  templateUrl: './site-factor-edit-iii.component.html',
  styleUrls: ['./site-factor-edit-iii.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SiteFactorEditIiiComponent implements OnInit, OnChanges {
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


  dateFormControlList = [];

  constructor(
    private expSiteService: ExpSiteService,
    private siteFactorService: SiteFactorService,
  ) { }

  ngOnChanges() {
    this.get();
  }

  ngOnInit(): void {
  }

  get() {
    this.dateFormControlList = [];
    try {
      const timingDateList: string[] = this.siteFactor.levelName.split('|');
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

  addDate() {
    const dateNow: Date = new Date(Date.now());
    const dateFormControl = new FormControl(dateNow.toISOString());
    const timingDateList: string[] = [];
    this.dateFormControlList.push(dateFormControl);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 10).replace('T', ' '));
    });
    this.siteFactor.levelName = timingDateList.join('|');
    this.itemGroup.treatmentList = timingDateList;
    this.put();
  }

  removeDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList.splice(i, 1);
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 10).replace('T', ' '));
    });
    this.siteFactor.levelName = timingDateList.join('|');
    this.itemGroup.treatmentList = timingDateList;
    this.verifyInTreatment(timingDateList);
    this.put();
  }

  updateDate(i: number) {
    const timingDateList: string[] = [];
    this.dateFormControlList[i].setValue(this.dateFormControlList[i].value.toISOString());
    this.dateFormControlList.forEach(element => {
      timingDateList.push(element.value.slice(0, 10).replace('T', ' '));
    });
    this.siteFactor.levelName = timingDateList.join('|');
    this.itemGroup.treatmentList = timingDateList;
    this.verifyInTreatment(timingDateList);
    this.put();
  }

}
