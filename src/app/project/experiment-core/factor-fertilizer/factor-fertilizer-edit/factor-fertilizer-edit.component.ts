import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SiteFactor } from '../../site-factor/model/site-factor';
import { FactorFertilizer } from '../model/factor-fertilizer';
import { FactorFertilizerService } from '../service/factor-fertilizer.service';

@Component({
  selector: 'app-factor-fertilizer-edit',
  templateUrl: './factor-fertilizer-edit.component.html',
  styleUrls: ['./factor-fertilizer-edit.component.css']
})
export class FactorFertilizerEditComponent implements OnInit, OnChanges {
  @Input() filter: {
    siteFactorId: string,
    indexOrder: string,
    factorType: string
  };
  @Input() siteFactorList: SiteFactor[];

  @Input() factorFertilizerList: FactorFertilizer[];

  @Input() productList: {
    index: string,
    product: string,
    nutrients: string
  }[];

  constructor(
    private factorFertilizerService: FactorFertilizerService,
  ) { }


  factorFertilizerListFiltered: FactorFertilizer[] = [];

  levelNameSplit: string;
  // productValue: string;
  typeFertilizer: string;
  unit: string;


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


  productValueControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.loadTable();

    this.filteredOptions = this.productValueControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  ngOnChanges() {
    this.getFactorFertilizerList();
  }

  getFactorFertilizerList() {

    this.factorFertilizerList.filter(obj => obj.siteFactorId === this.filter.siteFactorId && obj.indexOrder === this.filter.indexOrder)
      .forEach(_factorFertilizer => {
        this.factorFertilizerListFiltered.push(_factorFertilizer);
      });

    const factorFertilizer = this.factorFertilizerList
      .filter(obj => obj.siteFactorId === this.filter.siteFactorId && obj.indexOrder === this.filter.indexOrder)[0];

    this.levelNameSplit = factorFertilizer.levelNameSplit;

    this.productValueControl.setValue('');
    if (factorFertilizer.productValue) {
      this.productValueControl.setValue(factorFertilizer.productValue);
    }

    this.typeFertilizer = factorFertilizer.typeFertilizer;

    this.unit = factorFertilizer.unit;

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

    this.factorFertilizerListFiltered.forEach((factorFertilizer: FactorFertilizer) => {
      factorFertilizer.elementListGroup = nutrientList.join('|');
      this.putFactorFertilizer(factorFertilizer);
    });

  }

  loadTable() {

    const factorFertilizer = this.factorFertilizerListFiltered[0];

    this.nutrientElementN = factorFertilizer.elementListGroup.split('|')[0] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[0];
    this.nutrientElementP = factorFertilizer.elementListGroup.split('|')[1] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[1];
    this.nutrientElementK = factorFertilizer.elementListGroup.split('|')[2] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[2];
    this.nutrientElementCa = factorFertilizer.elementListGroup.split('|')[3] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[3];
    this.nutrientElementMg = factorFertilizer.elementListGroup.split('|')[4] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[4];
    this.nutrientElementS = factorFertilizer.elementListGroup.split('|')[5] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[5];
    this.nutrientElementMb = factorFertilizer.elementListGroup.split('|')[6] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[6];
    this.nutrientElementZn = factorFertilizer.elementListGroup.split('|')[7] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[7];
    this.nutrientElementB = factorFertilizer.elementListGroup.split('|')[8] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[8];
    this.nutrientElementCu = factorFertilizer.elementListGroup.split('|')[9] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[9];
    this.nutrientElementFe = factorFertilizer.elementListGroup.split('|')[10] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[10];
    this.nutrientElementMn = factorFertilizer.elementListGroup.split('|')[11] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[11];
    this.nutrientElementNi = factorFertilizer.elementListGroup.split('|')[12] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[12];
    this.nutrientElementCl = factorFertilizer.elementListGroup.split('|')[13] === '0.0' ?
      null : factorFertilizer.elementListGroup.split('|')[13];
  }

  putFactorFertilizer(factorFertilizer: FactorFertilizer) {
    this.factorFertilizerService.put(factorFertilizer)
      .subscribe(() => this.loadTable());
  }

  optionSelected($event: any) {

    if (this.productList.find(obj => obj.product === $event)) {
      this.factorFertilizerListFiltered.forEach((factorFertilizer: FactorFertilizer) => {
        factorFertilizer.studyVariableId = this.productList.find(obj => obj.product === $event).index;
        factorFertilizer.productValue = $event;
        factorFertilizer.elementListGroup = this.productList.find(obj => obj.product === $event).nutrients;
        this.putFactorFertilizer(factorFertilizer);
      });
    } else if ($event) {
      // this.cropFertilizer.studyVariableId = null;
      // this.cropFertilizer.productValue = $event;
      // this.cropFertilizer.elementListGroup = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      // this.cropFertilizerService.put(this.cropFertilizer).subscribe(
      //   () => this.loadTable()
      // );
    } else {
      // this.cropFertilizer.studyVariableId = null;
      // this.cropFertilizer.productValue = null;
      // this.cropFertilizer.elementListGroup = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      // this.cropFertilizerService.put(this.cropFertilizer).subscribe(
      //   () => this.loadTable()
      // );
    }

  }
  optionRemove() {
    this.productValueControl.setValue('');
    this.factorFertilizerListFiltered.forEach((factorFertilizer: FactorFertilizer) => {
      factorFertilizer.studyVariableId = null;
      factorFertilizer.productValue = null;
      factorFertilizer.elementListGroup = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      this.putFactorFertilizer(factorFertilizer);
    });
  }


  private _filter(product: string): string[] {
    const filterValue = product.toLowerCase();
    const optionList: string[] = [];

    this.productList.forEach(element => {
      optionList.push(element.product);
    });

    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }
}
