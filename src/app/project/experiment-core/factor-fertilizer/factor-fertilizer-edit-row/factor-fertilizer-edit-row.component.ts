import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import { FactorFertilizer } from '../model/factor-fertilizer';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { FormControl } from '@angular/forms';
import { FactorFertilizerService } from '../service/factor-fertilizer.service';
import { MatChipInputEvent } from '@angular/material';
@Component({
  selector: 'app-factor-fertilizer-edit-row',
  templateUrl: './factor-fertilizer-edit-row.component.html',
  styleUrls: ['./factor-fertilizer-edit-row.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class FactorFertilizerEditRowComponent implements OnInit {


  @Input() factorFertilizer: FactorFertilizer;
  @Input() factorType: string;

  timingOptionList: Parameter[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];

  tractionList: Parameter[];
  techniqueList: Parameter[];

  dateNow: Date = new Date(Date.now());
  formControlDate = new FormControl(this.dateNow.toISOString());
  formControlFrequency: string;
  formControlListDAP: string[] = [];
  formControlListGS: string[] = [];
  formControlListO: string[] = [];

  // caseDaysAfterPlanting = '259';
  // caseFrequency = '260';
  // caseDate = '261';
  // caseGrowthStage = '262';
  // caseOther = '263';

  constructor(
    private parameterService: ParameterService,
    private factorFertilizerService: FactorFertilizerService,
  ) { }


  ngOnInit(): void {
    this.getComponentValues();

    this.getTimingOptionList();
    this.getTechniqueList();
    this.getTractionList();
  }

  getComponentValues() {

    switch (this.factorFertilizer.timing) {
      case 'Days after planting':
        if (this.factorFertilizer.timingDaysAfterPlanting) {
          this.factorFertilizer.timingDaysAfterPlanting.split('|').forEach(element => {
            this.formControlListDAP.push(element);
          });
        }
        break;

      case 'Growth stage':
        if (this.factorFertilizer.timingGrowthStage) {
          this.factorFertilizer.timingGrowthStage.split('|').forEach(element => {
            this.formControlListGS.push(element);
          });
        }
        break;

      case 'Other':
        if (this.factorFertilizer.timingOther) {
          this.factorFertilizer.timingOther.split('|').forEach(element => {
            this.formControlListO.push(element);
          });
        }
        break;

      case 'Date':
        this.formControlDate.setValue(new Date(this.factorFertilizer.timingDate + ' 00:00:00').toISOString());
        break;

      case 'Frequency':
        this.formControlFrequency = this.factorFertilizer.timingFrequency;
        break;

      default:
        break;
    }

  }

  getTimingOptionList() {
    return this.parameterService
      .getAll('multiple_measurement', 'timing')
      .subscribe((_timingOptionList: Parameter[]) => this.timingOptionList = _timingOptionList);
  }

  put() {
    this.factorFertilizerService.put(this.factorFertilizer).subscribe();
  }


  getTechniqueList() {
    return this.parameterService
      .getAll('fertilizer', 'technique')
      .subscribe((_parameter: Parameter[]) => this.techniqueList = _parameter);
  }

  getTractionList() {
    return this.parameterService
      .getAll('fertilizer', 'traction')
      .subscribe((_parameter: Parameter[]) => this.tractionList = _parameter);
  }


  timingChange() {
    this.formControlDate.setValue(null);
    let timingDate: string = null;
    this.formControlFrequency = null;
    this.formControlListDAP = [];
    this.formControlListGS = [];
    this.formControlListO = [];

    if (this.factorFertilizer.timing === 'Date') {
      const dateNow: Date = new Date(Date.now());
      this.formControlDate.setValue(dateNow);
      timingDate = this.formControlDate.value.toISOString().slice(0, 10);
    }

    this.factorFertilizer.timingDaysAfterPlanting = null;
    this.factorFertilizer.timingFrequency = null;
    this.factorFertilizer.timingDate = timingDate;
    this.factorFertilizer.timingGrowthStage = null;
    this.factorFertilizer.timingOther = null;
    this.put();

  }



  updateTiming($event: MatChipInputEvent | any) {

    switch (this.factorFertilizer.timing) {
      case 'Days after planting':
        if (($event.value || '').trim()) {
          const index = this.formControlListDAP.indexOf($event.value);
          if (index < 0) {
            this.formControlListDAP.push($event.value.trim());
            this.factorFertilizer.timingDaysAfterPlanting = this.formControlListDAP.join('|');
            this.put();
          }
          $event.input.value = '';
        } break;

      case 'Growth stage':
        if (($event.value || '').trim()) {
          const index = this.formControlListGS.indexOf($event.value);
          if (index < 0) {
            this.formControlListGS.push($event.value.trim());
            this.factorFertilizer.timingGrowthStage = this.formControlListGS.join('|');
            this.put();
          }
          $event.input.value = '';
        } break;

      case 'Other':
        if (($event.value || '').trim()) {
          const index = this.formControlListO.indexOf($event.value);
          if (index < 0) {
            this.formControlListO.push($event.value.trim());
            this.factorFertilizer.timingOther = this.formControlListO.join('|');
            this.put();
          }
          $event.input.value = '';
        } break;

      case 'Date':
        this.factorFertilizer.timingDate = this.formControlDate.value.toISOString().slice(0, 10);
        this.put();
        break;

      case 'Frequency':
        this.factorFertilizer.timingFrequency = this.formControlFrequency;
        this.put();
        break;

      default:
        break;
    }

  }

  removeTiming(formControlItem: string) {
    switch (this.factorFertilizer.timing) {
      case 'Days after planting':
        const indexDAP = this.formControlListDAP.indexOf(formControlItem);
        if (indexDAP >= 0) {
          this.formControlListDAP.splice(indexDAP, 1);
          this.factorFertilizer.timingDaysAfterPlanting = this.formControlListDAP.join('|');
          this.put();
        }
        break;

      case 'Growth stage':
        const indexGS = this.formControlListGS.indexOf(formControlItem);
        if (indexGS >= 0) {
          this.formControlListGS.splice(indexGS, 1);
          this.factorFertilizer.timingGrowthStage = this.formControlListGS.join('|');
          this.put();
        }
        break;

      case 'Other':
        const indexO = this.formControlListO.indexOf(formControlItem);
        if (indexO >= 0) {
          this.formControlListO.splice(indexO, 1);
          this.factorFertilizer.timingOther = this.formControlListO.join('|');
          this.put();
        }
        break;

      default:
        break;
    }
  }

}
