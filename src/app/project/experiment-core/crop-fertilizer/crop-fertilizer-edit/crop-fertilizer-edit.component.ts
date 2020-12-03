import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CropFertilizer } from '../model/crop-fertilizer';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Parameter } from '../../parameter/model/parameter';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { ParameterService } from '../../parameter/service/parameter.service';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import { CropFertilizerService } from '../service/crop-fertilizer.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { MatChipInputEvent } from '@angular/material';
@Component({
  selector: 'app-crop-fertilizer-edit',
  templateUrl: './crop-fertilizer-edit.component.html',
  styleUrls: ['./crop-fertilizer-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CropFertilizerEditComponent implements OnInit, OnChanges {

  @Input() cropFertilizerGroup: {
    indexOrder: string,
    indexOrderTitle: number,
    typeFertilizer: string,
    cropFertilizerList: CropFertilizer[],
  };

  @Input() index: number;

  @Input() typeFertilizer: string;

  @Input() productList: {
    index: string,
    product: string,
    nutrients: string
  }[];

  editField: string;

  dateNow: Date = new Date(Date.now());
  formControlDate = new FormControl(this.dateNow.toISOString());
  formControlFrequency: string;
  formControlListDAP: string[] = [];
  formControlListGS: string[] = [];
  formControlListO: string[] = [];

  timing: string;
  timingOptionList: Parameter[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];

  techniqueId: string;
  techniqueList: Parameter[];
  techniqueOther: string;

  tractionId: string;
  tractionList: Parameter[];
  tractionOther: string;

  nutrientElementN: string;
  nutrientElementP: string;
  nutrientElementK: string;
  nutrientElementCa: string;
  nutrientElementMg: string;
  nutrientElementS: string;
  nutrientElementMb: string;
  nutrientElementZn: string;
  nutrientElementB: string;
  nutrientElementCu: string;
  nutrientElementFe: string;
  nutrientElementMn: string;
  nutrientElementNi: string;
  nutrientElementCl: string;

  @Output() eventEmitterCropFertilizerEditRemove = new EventEmitter();

  constructor(
    private studyVariableService: StudyVariableService,
    private parameterService: ParameterService,
    private cropFertilizerService: CropFertilizerService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
    this.getComponentValues();
    // list to this component
    this.getTimingOptionList();
    this.getTechniqueList();
    this.getTractionList();
  }

  ngOnChanges() {
  }


  updateTable() {

    const nutrientList: string[] = [];

    if (this.nutrientElementN === null || this.nutrientElementN === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementN);
    }

    if (this.nutrientElementP === null || this.nutrientElementP === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementP);
    }

    if (this.nutrientElementK === null || this.nutrientElementK === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementK);
    }

    if (this.nutrientElementCa === null || this.nutrientElementCa === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementCa);
    }

    if (this.nutrientElementMg === null || this.nutrientElementMg === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementMg);
    }

    if (this.nutrientElementS === null || this.nutrientElementS === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementS);
    }

    if (this.nutrientElementMb === null || this.nutrientElementMb === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementMb);
    }

    if (this.nutrientElementZn === null || this.nutrientElementZn === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementZn);
    }

    if (this.nutrientElementB === null || this.nutrientElementB === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementB);
    }

    if (this.nutrientElementCu === null || this.nutrientElementCu === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementCu);
    }

    if (this.nutrientElementFe === null || this.nutrientElementFe === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementFe);
    }

    if (this.nutrientElementMn === null || this.nutrientElementMn === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementMn);
    }

    if (this.nutrientElementNi === null || this.nutrientElementNi === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementNi);
    }

    if (this.nutrientElementCl === null || this.nutrientElementCl === '') {
      nutrientList.push('0.0');
    } else {
      nutrientList.push(this.nutrientElementCl);
    }

    this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
      cropFertilizer.elementListGroup = nutrientList.join('|');
      this.putCropFertilizer(cropFertilizer);
    });

  }

  loadTable() {

    const cropFertilizer = this.cropFertilizerGroup.cropFertilizerList[0];

    this.nutrientElementN = cropFertilizer.elementListGroup.split('|')[0] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[0];
    this.nutrientElementP = cropFertilizer.elementListGroup.split('|')[1] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[1];
    this.nutrientElementK = cropFertilizer.elementListGroup.split('|')[2] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[2];
    this.nutrientElementCa = cropFertilizer.elementListGroup.split('|')[3] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[3];
    this.nutrientElementMg = cropFertilizer.elementListGroup.split('|')[4] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[4];
    this.nutrientElementS = cropFertilizer.elementListGroup.split('|')[5] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[5];
    this.nutrientElementMb = cropFertilizer.elementListGroup.split('|')[6] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[6];
    this.nutrientElementZn = cropFertilizer.elementListGroup.split('|')[7] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[7];
    this.nutrientElementB = cropFertilizer.elementListGroup.split('|')[8] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[8];
    this.nutrientElementCu = cropFertilizer.elementListGroup.split('|')[9] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[9];
    this.nutrientElementFe = cropFertilizer.elementListGroup.split('|')[10] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[10];
    this.nutrientElementMn = cropFertilizer.elementListGroup.split('|')[11] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[11];
    this.nutrientElementNi = cropFertilizer.elementListGroup.split('|')[12] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[12];
    this.nutrientElementCl = cropFertilizer.elementListGroup.split('|')[13] === '0.0' ?
      null : cropFertilizer.elementListGroup.split('|')[13];
  }

  getComponentValues() {
    const cropFertilizer = this.cropFertilizerGroup.cropFertilizerList[0];
    this.timing = cropFertilizer.timing;

    switch (cropFertilizer.timing) {
      case 'Days after planting':
        if (cropFertilizer.timingDaysAfterPlanting) {
          cropFertilizer.timingDaysAfterPlanting.split('|').forEach(element => {
            this.formControlListDAP.push(element);
          });
        }
        break;

      case 'Growth stage':
        if (cropFertilizer.timingGrowthStage) {
          cropFertilizer.timingGrowthStage.split('|').forEach(element => {
            this.formControlListGS.push(element);
          });
        }
        break;

      case 'Other':
        if (cropFertilizer.timingOther) {
          cropFertilizer.timingOther.split('|').forEach(element => {
            this.formControlListO.push(element);
          });
        }
        break;

      case 'Date':
        this.formControlDate.setValue(new Date(cropFertilizer.timingDate + ' 00:00:00').toISOString());
        break;

      case 'Frequency':
        this.formControlFrequency = cropFertilizer.timingFrequency;
        break;

      default:
        break;
    }

    this.techniqueId = cropFertilizer.techniqueId;
    this.techniqueOther = cropFertilizer.techniqueOther;

    this.tractionId = cropFertilizer.tractionId;
    this.tractionOther = cropFertilizer.tractionOther;
  }

  getTimingOptionList() {
    return this.parameterService
      .getAll('multiple_measurement', 'timing')
      .subscribe((_timingOptionList: Parameter[]) => this.timingOptionList = _timingOptionList);
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

  techniqueChange() {
    this.techniqueOther = null;
    this.cropFertilizerGroup.cropFertilizerList.forEach(cropFertilizer => {
      cropFertilizer.techniqueId = this.techniqueId;
      cropFertilizer.techniqueOther = this.techniqueOther;
      this.putCropFertilizer(cropFertilizer);
    });
  }

  techniqueChangeOther() {
    this.cropFertilizerGroup.cropFertilizerList.forEach(cropFertilizer => {
      cropFertilizer.techniqueOther = this.techniqueOther;
      this.putCropFertilizer(cropFertilizer);
    });
  }

  tractionChange() {
    this.tractionOther = null;
    this.cropFertilizerGroup.cropFertilizerList.forEach(cropFertilizer => {
      cropFertilizer.tractionId = this.tractionId;
      cropFertilizer.tractionOther = this.tractionOther;
      this.putCropFertilizer(cropFertilizer);
    });
  }

  tractionChangeOther() {
    this.cropFertilizerGroup.cropFertilizerList.forEach(cropFertilizer => {
      cropFertilizer.tractionOther = this.tractionOther;
      this.putCropFertilizer(cropFertilizer);
    });
  }

  post() {
    const cropFertilizer = this.cropFertilizerGroup.cropFertilizerList[0];
    const _cropFertilizer = new CropFertilizer(
      cropFertilizer.siteCropId,
      cropFertilizer.expSiteId,
      cropFertilizer.cropId,
      cropFertilizer.typeFertilizer,
      cropFertilizer.indexOrder, null,
      null,
      cropFertilizer.unit,
      cropFertilizer.unitId,
      null,
      '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0',
      cropFertilizer.elementListGroup,
      null, null, null, null, null, null, null, null, null, null, null,
      'on');
    this.cropFertilizerService.post(_cropFertilizer).subscribe(
      (val) => {
        _cropFertilizer.cropFertilizerId = val['result'];
        this.cropFertilizerGroup.cropFertilizerList.push(_cropFertilizer);
      }
    );
  }

  timingChange() {
    this.formControlDate.setValue(null);
    let timingDate: string = null;
    this.formControlFrequency = null;
    this.formControlListDAP = [];
    this.formControlListGS = [];
    this.formControlListO = [];

    if (this.timing === 'Date') {
      const dateNow: Date = new Date(Date.now());
      this.formControlDate.setValue(dateNow);
      timingDate = this.formControlDate.value.toISOString().slice(0, 10);
    }
    this.cropFertilizerGroup.cropFertilizerList.forEach(cropFertilizer => {
      cropFertilizer.timing = this.timing;
      cropFertilizer.timingDaysAfterPlanting = null;
      cropFertilizer.timingFrequency = null;
      cropFertilizer.timingDate = timingDate;
      cropFertilizer.timingGrowthStage = null;
      cropFertilizer.timingOther = null;
      this.putCropFertilizer(cropFertilizer);
    });
  }

  updateTiming($event: MatChipInputEvent | any) {

    switch (this.timing) {
      case 'Days after planting':
        if (($event.value || '').trim()) {
          const index = this.formControlListDAP.indexOf($event.value);
          if (index < 0) {
            this.formControlListDAP.push($event.value.trim());
            this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
              cropFertilizer.timingDaysAfterPlanting = this.formControlListDAP.join('|');
              this.putCropFertilizer(cropFertilizer);
            });
          }
          $event.input.value = '';
        } break;

      case 'Growth stage':
        if (($event.value || '').trim()) {
          const index = this.formControlListGS.indexOf($event.value);
          if (index < 0) {
            this.formControlListGS.push($event.value.trim());
            this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
              cropFertilizer.timingGrowthStage = this.formControlListGS.join('|');
              this.putCropFertilizer(cropFertilizer);
            });
          }
          $event.input.value = '';
        } break;

      case 'Other':
        if (($event.value || '').trim()) {
          const index = this.formControlListO.indexOf($event.value);
          if (index < 0) {
            this.formControlListO.push($event.value.trim());
            this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
              cropFertilizer.timingOther = this.formControlListO.join('|');
              this.putCropFertilizer(cropFertilizer);
            });
          }
          $event.input.value = '';
        } break;

      case 'Date':
        this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
          cropFertilizer.timingDate = this.formControlDate.value.toISOString().slice(0, 10);
          this.putCropFertilizer(cropFertilizer);
        }); break;

      case 'Frequency':
        this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
          cropFertilizer.timingFrequency = this.formControlFrequency;
          this.putCropFertilizer(cropFertilizer);
        }); break;

      default:
        break;
    }

  }

  removeTiming(formControlItem: string) {
    switch (this.timing) {
      case 'Days after planting':
        const indexDAP = this.formControlListDAP.indexOf(formControlItem);
        if (indexDAP >= 0) {
          this.formControlListDAP.splice(indexDAP, 1);
          this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
            cropFertilizer.timingDaysAfterPlanting = this.formControlListDAP.join('|');
            this.putCropFertilizer(cropFertilizer);
          });
        }
        break;

      case 'Growth stage':
        const indexGS = this.formControlListGS.indexOf(formControlItem);
        if (indexGS >= 0) {
          this.formControlListGS.splice(indexGS, 1);
          this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
            cropFertilizer.timingGrowthStage = this.formControlListGS.join('|');
            this.putCropFertilizer(cropFertilizer);
          });
        }
        break;

      case 'Other':
        const indexO = this.formControlListO.indexOf(formControlItem);
        if (indexO >= 0) {
          this.formControlListO.splice(indexO, 1);
          this.cropFertilizerGroup.cropFertilizerList.forEach((cropFertilizer: CropFertilizer) => {
            cropFertilizer.timingOther = this.formControlListO.join('|');
            this.putCropFertilizer(cropFertilizer);
          });
        }
        break;

      default:
        break;
    }
  }

  removeGroup() {
    this.cropFertilizerGroup.cropFertilizerList.forEach(element => {
      this.cropFertilizerService.delete(element.cropFertilizerId).subscribe();
    });

    this.eventEmitterCropFertilizerEditRemove.emit();
  }

  remove(index: number) {
    this.cropFertilizerGroup.cropFertilizerList.splice(index, 1);
  }

  putCropFertilizer(cropFertilizer: CropFertilizer) {
    this.cropFertilizerService.put(cropFertilizer)
      .subscribe();
  }
}

