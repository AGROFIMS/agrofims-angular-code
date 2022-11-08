import { ManageDownloadService } from './../../manage-download/service/manage-download.service';
import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SiteFactor } from '../../site-factor/model/site-factor';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { FactorFertilizer } from '../model/factor-fertilizer';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-factor-fertilizer-list',
  templateUrl: './factor-fertilizer-list.component.html',
  styleUrls: ['./factor-fertilizer-list.component.css'],
  animations: [
    trigger('load', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class FactorFertilizerListComponent implements OnInit, OnChanges {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studyVariableService: StudyVariableService,
    private manageDownloadService: ManageDownloadService,
  ) { }

  filterList: {
    siteFactorId: string,
    indexOrder: string,
    factorType: string
  }[] = [];

  productList: {
    index: string,
    product: string,
    nutrients: string
  }[] = [];

  // calculateMessage = 'Under construction...';
  showMessage: boolean;
  resStatus: string;
  resMsg: string;
  resDataTable: {
    productvalue: string,
    indexOrder: string,
    unit: string,
    N: string,
    P: string,
    K: string,
    Ca: string,
    Mg: string,
    S: string,
    Mb: string,
    Zn: string,
    B: string,
    Cu: string,
    Fe: string,
    Mn: string,
    Ni: string,
    Cl: string
  }[];


  ngOnInit(): void {

    this.showMessage = false;

    this.getFactorFertilizerList();

    this.getMeasurementList();
  }

  ngOnChanges() {

  }

  getFactorFertilizerList() {

    this.data.itemGroup.siteFactorList.forEach((siteFactor: SiteFactor) => {

      const indexOrderList = [
        ... new Set(
          this.data.factorFertilizerList
            .filter((obj: FactorFertilizer) => obj.siteFactorId === siteFactor.siteFactorId)
            .map(
              (object: FactorFertilizer) =>
                object.indexOrder
            )
        )
      ];

      indexOrderList.forEach(element => {
        const siteFactorId = siteFactor.siteFactorId;
        const indexOrder = element.toString();
        const factorType = siteFactor.factorType;
        const filter: {
          siteFactorId: string,
          indexOrder: string,
          factorType: string
        } = {
          siteFactorId,
          indexOrder,
          factorType
        };
        this.filterList.push(filter);
      });


    });

  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('fertilizer')
      .subscribe(
        (_productList: StudyVariable[]) => {
          _productList
            .forEach(element => {
              const index = element.studyVariableId;
              const product = element.measurement;
              const nutrients = element.variableCategory;
              const measurement: { index: string, product: string, nutrients: string } = { index, product, nutrients };
              this.productList.push(measurement);
            });
        }
      );
  }

  calculate() {

    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);

    // version
    const param1 = '0291';

    // env
    const param2 = 'dev';

    // group
    // const param3 = this.data.itemGroup.indexOrder;
    const param3 = '3';

    // type_factor
    // const param4 = this.data.type_factor;
    const param4 = 'Product';

    // expsiteId
    // const param5 = this.data.expsiteId;
    const param5 = '25';

    console.log(
      {
        param1: param1,
        param2: param2,
        param3: this.data.itemGroup.indexOrder,
        param4: this.data.type_factor,
        param5: this.data.expsiteId
      }
    );

    console.log(
      {
        param1: param1,
        param2: param2,
        param3: param3,
        param4: param4,
        param5: param5
      }
    );

    return this.manageDownloadService
      .rFactorFertilizer(
        param1,
        param2,
        param3,
        param4,
        param5,
      ).subscribe(
        (resp) => {
          console.log(resp);
          this.resStatus = resp['result']['status'][0];
          this.resMsg = resp['result']['msg'][0];
          this.resDataTable = resp['result']['table'];
        }
      );
  }

}
