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
  selector: 'app-site-factor-edit-iv',
  templateUrl: './site-factor-edit-iv.component.html',
  styleUrls: ['./site-factor-edit-iv.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class SiteFactorEditIvComponent implements OnInit, OnChanges {
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
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


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
    try {
      this.levelNameSelected = this.siteFactor.levelName.split('|');
    } catch (error) {
      this.levelNameSelected = [];
    }
    try {
      this.dateFormControlList = [];
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

  factorTypeChange($event: any) {
    this.siteFactor.levelName = null;
    this.siteFactor.factorUnit = null;

    this.levelNameSelected = [];
    this.dateFormControlList = [];

    this.itemGroup.treatmentList = [];

    if ($event === 'date') {
      const dateNow: Date = new Date(Date.now());
      const timingDateList: string[] = [];

      timingDateList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));
      timingDateList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));

      this.dateFormControlList.push(new FormControl(dateNow.toISOString()));
      this.dateFormControlList.push(new FormControl(dateNow.toISOString()));

      this.itemGroup.treatmentList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));
      this.itemGroup.treatmentList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));

      this.siteFactor.levelName = timingDateList.join('|');
    }
    this.verifyInTreatment(this.itemGroup.treatmentList);
    this.put();
  }

  factorUnitChange($event: any) {
    this.itemGroup.treatmentList = this.levelNameSelected.map(obj => obj + '_' + $event);
    this.verifyInTreatment(this.itemGroup.treatmentList);
    this.put();
  }

  put() {
    this.siteFactorService
      .put(this.siteFactor)
      .subscribe();
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.levelNameSelected.indexOf(value);
      if (index < 0) {
        this.levelNameSelected.push(value.trim());
        const _treatment = this.siteFactor.factorUnit ? value.trim() + '_' + this.siteFactor.factorUnit : value.trim();
        this.itemGroup.treatmentList.push(_treatment);
        this.siteFactor.levelName = this.levelNameSelected.join('|');
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  removeChip(itemOther: string): void {
    const index = this.levelNameSelected.indexOf(itemOther);
    if (index >= 0) {
      this.levelNameSelected.splice(index, 1);
      this.itemGroup.treatmentList.splice(index, 1);
      this.siteFactor.levelName = this.levelNameSelected.join('|');
      this.verifyInTreatment(this.levelNameSelected);
      this.put();
    }
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
    this.verifyInTreatment(this.itemGroup.treatmentList);
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
    this.verifyInTreatment(this.itemGroup.treatmentList);
    this.put();
  }

}
