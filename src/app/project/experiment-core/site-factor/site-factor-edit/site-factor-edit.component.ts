import { Component, OnInit, Input, Output, EventEmitter, OnChanges, DoCheck } from '@angular/core';
import { SiteFactorService } from '../service/site-factor.service';
import { SiteFactor } from '../model/site-factor';
import { Factor } from '../../factor/model/factor';
import { FactorService } from '../../factor/service/factor.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';
import { MatDialog } from '@angular/material/dialog';
import { FactorFertilizerListComponent } from '../../factor-fertilizer/factor-fertilizer-list/factor-fertilizer-list.component';
import { FactorFertilizerService } from '../../factor-fertilizer/service/factor-fertilizer.service';
import { FactorFertilizer } from '../../factor-fertilizer/model/factor-fertilizer';

@Component({
  selector: 'app-site-factor-edit',
  templateUrl: './site-factor-edit.component.html',
  styleUrls: ['./site-factor-edit.component.css']
})
export class SiteFactorEditComponent implements OnInit, OnChanges, DoCheck {

  @Input() expSite: ExpSite;
  @Input() itemGroup: {
    indexOrder: string,
    siteFactorList: SiteFactor[],
    treatmentList: string[],
    factorNameMain: string,
  };
  @Input() indexIG: number;
  @Input() minFactor: number;
  @Input() factorListComponent: number;
  @Input() factorList: {
    id: string,
    value: string,
    info: string,
    form: string,
    multiCrop: string
  }[] = [];

  // formControlFactorName = new FormControl();

  formControlFactorName = new FormControl('', [Validators.required]);


  filteredOptions: Observable<string[]>;
  factorTitle: string;
  factorName: string;
  factorOther: string;
  crop: string;
  factorNote: string;
  adInfo: string;
  form: string;
  multiCrop: string;
  factorFertilizerList: FactorFertilizer[] = [];
  varFactorNameOld: string;

  diffUnit = false;
  unit: string;

  @Output() eventEmitterSiteFactorEditRemove = new EventEmitter<any>();
  @Output() eventEmitterSiteFactorEditOptionSelected = new EventEmitter();

  constructor(
    private siteFactorService: SiteFactorService,
    private factorService: FactorService,
    private expSiteService: ExpSiteService,
    private factorFertilizerService: FactorFertilizerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.filteredOptions = this.formControlFactorName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngOnChanges() {
    this.getAllFiltered();
  }

  ngDoCheck(): void {
    const unitList = this.factorFertilizerList
      .map(item => item.unit)
      .filter((value, index, self) => self.indexOf(value) === index);
    if (unitList.length > 1) {
      this.diffUnit = true;
    } else {
      this.unit = unitList[0];
      this.diffUnit = false;
    }
  }

  getAllFiltered() {
    const siteFactorInit = this.itemGroup.siteFactorList[0];

    this.factorTitle = siteFactorInit.factorTitle;
    this.factorName = this.itemGroup.factorNameMain;
    this.factorOther = siteFactorInit.factorOther;
    this.crop = siteFactorInit.crop;
    this.adInfo = siteFactorInit.adInfo;
    this.form = siteFactorInit.form;
    this.multiCrop = siteFactorInit.multiCrop;

    this.siteCropListOnChange();

    if (this.itemGroup.factorNameMain) {
      this.formControlFactorName.setValue(this.itemGroup.factorNameMain);
    } else {
      this.formControlFactorName.setValue('');
    }

    this.itemGroup.siteFactorList.forEach(siteFactor => {
      this.factorFertilizerService.getById(siteFactor.siteFactorId)
        .subscribe(
          (_factorFertilizerList: FactorFertilizer[]) => {
            // push all obj factorFertilizer from every obj siteFactor in siteFactorList

            _factorFertilizerList.forEach(_factorFertilizer => {
              this.factorFertilizerList.push(_factorFertilizer);
            });
          }
        );
    });

  }

  siteCropListOnChange() {
    const _cropList: string[] = [];

    this.expSite.siteCropsOn.split('|').forEach(element => {
      if (element.split('.').length === 4) {
        _cropList.push(element.split('.')[3]);
      }
    });

    if (this.crop === null || _cropList.includes(this.crop)) {
    } else {
      this.crop = null;
      this.putCrop();
    }

  }

  putNote() {
    this.itemGroup.siteFactorList
      .forEach((_siteFactor: SiteFactor) => {
        _siteFactor.levelNameNote = this.factorNote;
        this.put(_siteFactor);
      });
  }

  putCrop() {
    this.itemGroup.siteFactorList
      .forEach((_siteFactor: SiteFactor) => {
        _siteFactor.crop = this.crop;
        this.put(_siteFactor);
      });
  }

  putOther() {
    this.itemGroup.siteFactorList
      .forEach((_siteFactor: SiteFactor) => {
        _siteFactor.factorOther = this.factorOther;
        this.put(_siteFactor);
      });
  }

  put(siteFactor: SiteFactor) {
    this.siteFactorService
      .put(siteFactor)
      .subscribe();
  }

  // delete site-factor-list (x)
  removeSiteFactorList() {
    this.itemGroup.siteFactorList
      .forEach(siteFactor => {
        this.siteFactorService.delete(siteFactor.siteFactorId)
          .subscribe(
            () => {
              this.removeFactorFertilizer(siteFactor);
              this.eventEmitterSiteFactorEditRemove.emit(this.indexIG);
            }
          );
      });
  }

  removeFactorFertilizer(siteFactor: SiteFactor) {
    const factorFertilizerList = this.factorFertilizerList.filter(obj1 => obj1.siteFactorId === siteFactor.siteFactorId);
    factorFertilizerList.forEach(obj2 => {
      this.deleteObjFromList(obj2, this.factorFertilizerList);
    });
  }

  // delete site - factor x
  catchEmitterSiteFactorEdit($event: number) {
    this.removeFactorFertilizer(this.itemGroup.siteFactorList[$event]);
    this.itemGroup.siteFactorList.splice($event, 1);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.factorList.forEach(element => {
      optionList.push(element.value);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  optionRemoved($event: any) {
    this.varFactorNameOld = this.formControlFactorName.value;
    this.formControlFactorName.setValue('');
  }

  blurInput($event: any) {
    if ($event) {
      if (!$event.relatedTarget) {
        if ($event.target.value) {
        } else {
          this.formControlFactorName.setValue(this.varFactorNameOld);
        }
      }
    }
  }

  optionSelected($event: any) {

    const _value = this.formControlFactorName.value;

    const _id = this.factorList.find(element => element.value === _value.toString()).id;
    const _info = this.factorList.find(element => element.value === _value.toString()).info;
    const _form = this.factorList.find(element => element.value === _value.toString()).form;
    const _multiCrop = this.factorList.find(element => element.value === _value.toString()).multiCrop;

    // ---------- clean treatments ---------- //
    const tListMain: string[] = [];
    if (this.expSite.treatment) {
      this.expSite.treatment.split('|').forEach(element => {
        const tList = element.split(' / ');
        tList[this.indexIG] = '-';
        tListMain.push(tList.join(' / '));
      });
      this.expSite.treatment = tListMain.join('|');
      this.expSiteService.put(this.expSite).subscribe(
        () => this.eventEmitterSiteFactorEditOptionSelected.emit()
      );
    }

    // ---------- Fertilizer & Nutrient ---------- //
    if (!($event.option.value === 'Fertilizer type and amount' || $event.option.value === 'Nutrient element type and amount')) {
      this.factorFertilizerList.forEach((obj: FactorFertilizer) => {
        this.factorFertilizerService.delete(obj.factorFertilizerId).subscribe(
          () => {
            this.deleteObjFromList(obj, this.factorFertilizerList);
          }
        );
      });
    }

    this.factorService
      .get(_id)
      .subscribe(
        (_factor: Factor) => {

          this.itemGroup.siteFactorList[0].crop = null;
          this.itemGroup.siteFactorList[0].levelName = null;
          this.itemGroup.siteFactorList[0].levelNameOther = null;
          this.itemGroup.siteFactorList[0].levelNameNote = null;
          this.itemGroup.siteFactorList[0].factorUnit = _factor.factorUnit
            ? _factor.factorUnit.split('|')[0] : null;
          this.itemGroup.siteFactorList[0].timing = null;
          this.itemGroup.siteFactorList[0].timingDaysAfterPlanting = null;
          this.itemGroup.siteFactorList[0].timingFrequency = null;
          this.itemGroup.siteFactorList[0].timingDate = null;
          this.itemGroup.siteFactorList[0].timingGrowthStage = null;
          this.itemGroup.siteFactorList[0].timingOther = null;
          this.itemGroup.siteFactorList[0].factorOther = null;
          this.itemGroup.siteFactorList[0].numberOfSplits = '1';
          this.itemGroup.siteFactorList[0].factorType = _factor.levelName
            && _factor.adInfo === 'yes'
            && _factor.form === 'combo box'
            ? _factor.levelName.split('|')[0] : null;
          this.itemGroup.siteFactorList[0].factorId = _id;
          this.itemGroup.siteFactorList[0].factorName = _value;
          this.itemGroup.siteFactorList[0].factorUnitList = _factor.factorUnit
            ? _factor.factorUnit : null;
          this.itemGroup.siteFactorList[0].levelNameList = _factor.levelName
            ? _factor.levelName : null;
          this.itemGroup.siteFactorList[0].adInfo = _info;
          this.itemGroup.siteFactorList[0].form = _form;
          this.itemGroup.siteFactorList[0].multiCrop = _multiCrop;

          this.itemGroup.treatmentList = [];
          this.itemGroup.factorNameMain = _value;

          // this.levelNameSelected = [];

          // ---------- CLEAN & INIT IF levelName IS DATE ---------- //
          if (_form === 'date') {
            this.itemGroup.siteFactorList[0].levelName = '';
            const dateNow: Date = new Date(Date.now());
            const timingDateList: string[] = [];

            timingDateList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));
            timingDateList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));

            this.itemGroup.treatmentList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));
            this.itemGroup.treatmentList.push(dateNow.toISOString().slice(0, 10).replace('T', ' '));

            this.itemGroup.siteFactorList[0].levelName = timingDateList.join('|');
          }
          // ------------------------------------------------------ //

          this.put(this.itemGroup.siteFactorList[0]);

          // ----------- DELETE IF SITE FACTOR LIST > 1 ----------- //
          const siteFactorList = this.itemGroup.siteFactorList
            .filter(obj => obj.siteFactorId !== this.itemGroup.siteFactorList[0].siteFactorId);

          siteFactorList.forEach(siteFactor => {
            this.siteFactorService.delete(siteFactor.siteFactorId).subscribe(
              () => {
                this.deleteObjFromList(siteFactor, this.itemGroup.siteFactorList);
              }
            );
          });

          // ------------------------------------------------------ //

          this.factorName = _value;
          this.factorOther = null;
          this.adInfo = _info;
          this.form = _form;
          this.multiCrop = _multiCrop;
          this.crop = null;
        }
      );
  }

  post() {

    const siteFactorTemplate = this.itemGroup.siteFactorList[0];

    const siteFactorNew = new SiteFactor(
      siteFactorTemplate.expSiteId,
      null,
      siteFactorTemplate.factorTitle,
      siteFactorTemplate.factorId,
      null,
      siteFactorTemplate.experimentalDesignAbbr,
      siteFactorTemplate.factorType,
      siteFactorTemplate.indexOrder,
      null, null,
      siteFactorTemplate.levelNameNote,
      siteFactorTemplate.factorUnit,
      '1', null, null, null, null, null, null, 'on', null,
      siteFactorTemplate.factorName,
      siteFactorTemplate.adInfo,
      siteFactorTemplate.form,
      siteFactorTemplate.factorUnitList,
      siteFactorTemplate.levelNameList,
      siteFactorTemplate.multiCrop
    );

    this.siteFactorService.post(siteFactorNew).subscribe(
      (val) => {
        siteFactorNew.siteFactorId = val['result'];
        this.itemGroup.siteFactorList.push(siteFactorNew);
      }
    );

  }


  deleteObjFromList(obj: any, objList: any[]) {
    const index: number = objList.indexOf(obj);
    if (index !== -1) {
      objList.splice(index, 1);
    }
  }


  popup() {
    const type_factor = (this.factorName === 'Fertilizer type and amount') ? 'Product' : 'Nutrient';
    const expsiteId = this.expSite.expSiteId;
    const dialogRef = this.dialog.open(FactorFertilizerListComponent, {
      data:
      {
        itemGroup: this.itemGroup,
        factorFertilizerList: this.factorFertilizerList,
        type_factor: type_factor,
        expsiteId: expsiteId,
        unit: this.unit,
      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (`${result}` === 'true') {
      //   setTimeout(() => { this.getAllFull(); }, 500);
      // }
    });

  }

}

