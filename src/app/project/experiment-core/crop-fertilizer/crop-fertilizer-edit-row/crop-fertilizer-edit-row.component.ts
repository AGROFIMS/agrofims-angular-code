import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CropFertilizer } from '../model/crop-fertilizer';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { CropFertilizerService } from '../service/crop-fertilizer.service';

@Component({
  selector: 'app-crop-fertilizer-edit-row',
  templateUrl: './crop-fertilizer-edit-row.component.html',
  styleUrls: ['./crop-fertilizer-edit-row.component.css']
})
export class CropFertilizerEditRowComponent implements OnInit, OnChanges {

  @Input() cropFertilizer: CropFertilizer;
  @Input() index: number;
  @Input() typeFertilizer: string;

  @Input() productList: {
    index: string,
    product: string,
    nutrients: string
  }[];

  editField: string;


  productValueControl = new FormControl();
  filteredOptions: Observable<string[]>;

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

  @Output() eventEmitterCropFertilizerEditRowRemove = new EventEmitter();

  constructor(
    private studyVariableService: StudyVariableService,
    private cropFertilizerService: CropFertilizerService
  ) { }

  ngOnChanges(): void {
    this.get();
  }

  ngOnInit(): void {

    this.loadTable();

    this.filteredOptions = this.productValueControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  get() {
    this.productValueControl.setValue('');
    if (this.cropFertilizer.productValue) {
      this.productValueControl.setValue(this.cropFertilizer.productValue);
    }
  }

  loadTable() {
    this.nutrientElementN = this.cropFertilizer.elementList.split('|')[0] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[0];
    this.nutrientElementP = this.cropFertilizer.elementList.split('|')[1] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[1];
    this.nutrientElementK = this.cropFertilizer.elementList.split('|')[2] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[2];
    this.nutrientElementCa = this.cropFertilizer.elementList.split('|')[3] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[3];
    this.nutrientElementMg = this.cropFertilizer.elementList.split('|')[4] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[4];
    this.nutrientElementS = this.cropFertilizer.elementList.split('|')[5] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[5];
    this.nutrientElementMb = this.cropFertilizer.elementList.split('|')[6] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[6];
    this.nutrientElementZn = this.cropFertilizer.elementList.split('|')[7] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[7];
    this.nutrientElementB = this.cropFertilizer.elementList.split('|')[8] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[8];
    this.nutrientElementCu = this.cropFertilizer.elementList.split('|')[9] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[9];
    this.nutrientElementFe = this.cropFertilizer.elementList.split('|')[10] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[10];
    this.nutrientElementMn = this.cropFertilizer.elementList.split('|')[11] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[11];
    this.nutrientElementNi = this.cropFertilizer.elementList.split('|')[12] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[12];
    this.nutrientElementCl = this.cropFertilizer.elementList.split('|')[13] === '0.0' ?
      null : this.cropFertilizer.elementList.split('|')[13];
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

    this.cropFertilizer.elementList = nutrientList.join('|');

    this.put();
  }

  put() {
    this.cropFertilizerService.put(this.cropFertilizer).subscribe();
  }

  private _filter(product: string): string[] {
    const filterValue = product.toLowerCase();
    const optionList: string[] = [];
    this.productList.forEach(element => {
      optionList.push(element.product);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  optionSelected($event: any) {

    if (this.productList.find(obj => obj.product === $event)) {
      this.cropFertilizer.studyVariableId = this.productList.find(obj => obj.product === $event).index;
      this.cropFertilizer.productValue = $event;
      this.cropFertilizer.elementList = this.productList.find(obj => obj.product === $event).nutrients;
      this.cropFertilizerService.put(this.cropFertilizer).subscribe(
        () => this.loadTable()
      );
    } else if ($event) {
      this.cropFertilizer.studyVariableId = null;
      this.cropFertilizer.productValue = $event;
      this.cropFertilizer.elementList = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      this.cropFertilizerService.put(this.cropFertilizer).subscribe(
        () => this.loadTable()
      );
    } else {
      this.cropFertilizer.studyVariableId = null;
      this.cropFertilizer.productValue = null;
      this.cropFertilizer.elementList = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      this.cropFertilizerService.put(this.cropFertilizer).subscribe(
        () => this.loadTable()
      );
    }

  }

  remove() {
    this.cropFertilizerService.delete(this.cropFertilizer.cropFertilizerId).subscribe(
      () => {
        this.eventEmitterCropFertilizerEditRowRemove.emit();
      }
    );
  }

}
