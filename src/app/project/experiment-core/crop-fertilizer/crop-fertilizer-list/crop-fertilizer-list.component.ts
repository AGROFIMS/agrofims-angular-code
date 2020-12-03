import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { startWith, map } from 'rxjs/operators';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import { CropFertilizer } from '../model/crop-fertilizer';
import { CropFertilizerService } from '../service/crop-fertilizer.service';
import { SiteCropService } from '../../site-crop/service/site-crop.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ManageDownloadService } from '../../manage-download/service/manage-download.service';

@Component({
  selector: 'app-crop-fertilizer-list',
  templateUrl: './crop-fertilizer-list.component.html',
  styleUrls: ['./crop-fertilizer-list.component.css'],
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
export class CropFertilizerListComponent implements OnInit, OnChanges {
  @Input() siteCropList: SiteCrop[];
  @Input() expSite: ExpSite;

  @Input() siteCropId: string;
  @Input() cropId: string;
  @Input() cropCommonName: string;

  @Input() expSiteId: string;
  @Input() indexCrop: number;

  @Input() unitList: Parameter[];

  itemList: any[];

  typeFertilizer = 'Product';

  unitIdProduct = '311';
  unitProduct = 'kg/ha';

  unitIdNutrient = null;
  unitNutrient: string;


  cropFertilizerGroupList: {
    indexOrder: string,
    indexOrderTitle: number,
    typeFertilizer: string,
    cropFertilizerList: CropFertilizer[],
  }[] = [];

  productList: {
    index: string,
    product: string,
    nutrients: string
  }[] = [];

  indexProduct = 0;
  indexNutrient = 0;

  calculateMessage = 'Under construction...';
  showMessage = false;

  dataTableProduct: {
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

  resStatusProduct: string;
  resMsgProduct: string;


  dataTableNutrient: {
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

  resStatusNutrient: string;
  resMsgNutrient: string;

  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;

  constructor(
    private studyVariableService: StudyVariableService,
    private cropFertilizerService: CropFertilizerService,
    private manageDownloadService: ManageDownloadService,

  ) { }

  ngOnChanges() {
    this.getAll();
  }

  ngOnInit(): void {
    // this.getUnitList();
    this.getMeasurementList();
  }

  unitNutrientChange() {

    const _unitId = this.unitIdNutrient;
    const _unit = this.unitList.find(obj => obj.parameterId.toString() === _unitId).name;

    return this.cropFertilizerService
      .getById(this.siteCropId)
      .subscribe(
        (_cropFertilizerList: CropFertilizer[]) => {
          _cropFertilizerList.filter(_cropFertilizer => _cropFertilizer.typeFertilizer === 'Nutrient').forEach(cropFertilizer => {
            cropFertilizer.unitId = _unitId;
            cropFertilizer.unit = _unit;
            this.cropFertilizerService.put(cropFertilizer).subscribe();
          });
        });

  }

  post() {
    const _typeFertilizer = this.typeFertilizer;
    const _unitId = (_typeFertilizer === 'Product') ? this.unitIdProduct : this.unitIdNutrient;
    const _unit = _unitId ? this.unitList.find(obj => obj.parameterId.toString() === _unitId).name : null;

    let newIndexOrder = 1;

    if (this.cropFertilizerGroupList.length > 0) {
      newIndexOrder = Math
        .max
        .apply(Math, (
          this.cropFertilizerGroupList
            .map(
              object => Number(object.indexOrder)
            )
        )) + 1;
    }

    let newIndexOrderTitle = 0;

    if (this.cropFertilizerGroupList.filter(obj1 => obj1.typeFertilizer === _typeFertilizer).length > 0) {
      newIndexOrderTitle = Math
        .max
        .apply(Math, (
          this.cropFertilizerGroupList
            .filter
            (
              obj1 => obj1.typeFertilizer === _typeFertilizer
            )
            .map
            (
              object => Number(object.indexOrderTitle)
            )
        )) + 1;
    }

    const _siteCropId: string = this.siteCropId;
    const _cropId: string = this.cropId;
    const cropFertilizer = new CropFertilizer(
      _siteCropId, this.expSite.expSiteId, _cropId,
      _typeFertilizer, newIndexOrder.toString(), null,
      null, _unit, _unitId, null,
      '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0',
      '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0',
      null, null, null, null, null, null, null, null,
      null, null, null, 'on');


    this.cropFertilizerService.post(cropFertilizer)
      .subscribe(
        (val) => {
          cropFertilizer.cropFertilizerId = val['result'];
          const indexOrder = newIndexOrder.toString();
          const indexOrderTitle = newIndexOrderTitle;
          const typeFertilizer = _typeFertilizer;
          const cropFertilizerList = [];
          cropFertilizerList.push(cropFertilizer);
          const itemCropManPracticesGroup: {
            indexOrder: string,
            indexOrderTitle: number,
            typeFertilizer: string,
            cropFertilizerList: CropFertilizer[]
          } = {
            indexOrder,
            indexOrderTitle,
            typeFertilizer,
            cropFertilizerList
          };
          this.cropFertilizerGroupList.push(itemCropManPracticesGroup);
        }
      );
  }

  getAll() {
    return this.cropFertilizerService
      .getById(this.siteCropId)
      .subscribe(
        (_cropFertilizerList: CropFertilizer[]) => {
          const indexOrderList = [
            ... new Set(
              _cropFertilizerList
                .map(
                  object =>
                    object.indexOrder
                )
            )
          ];
          this.cropFertilizerGroupList = [];
          indexOrderList.forEach(indexOrderItem => {
            const indexOrder = indexOrderItem;
            const typeFertilizer = _cropFertilizerList.filter(option => option.indexOrder === indexOrderItem)[0].typeFertilizer;
            const indexOrderTitle = [
              ... new Set(
                _cropFertilizerList
                  .filter(
                    obj1 => obj1.typeFertilizer === typeFertilizer
                  )
                  .map(
                    object =>
                      object.indexOrder
                  )
              )
            ].indexOf(indexOrderItem, 0);
            const unitId = _cropFertilizerList.filter(option => option.indexOrder === indexOrderItem)[0].unitId;
            const cropFertilizerList = _cropFertilizerList.filter(option => option.indexOrder === indexOrderItem);
            this.typeFertilizer = typeFertilizer;
            if (typeFertilizer === 'Product') {
              this.unitIdProduct = unitId;
              this.unitProduct = unitId ? this.unitList.find(obj => obj.parameterId.toString() === unitId).name : null;
            } else if (typeFertilizer === 'Nutrient') {
              this.unitIdNutrient = unitId;
              this.unitNutrient = unitId ? this.unitList.find(obj => obj.parameterId.toString() === unitId).name : null;
            }
            const cropFertilizerGroupItem: {
              indexOrder: string,
              indexOrderTitle: number,
              typeFertilizer: string,
              cropFertilizerList: CropFertilizer[],
            } = {
              indexOrder,
              indexOrderTitle,
              typeFertilizer,
              cropFertilizerList,
            };
            this.cropFertilizerGroupList.push(cropFertilizerGroupItem);
          });
          this.typeFertilizer = 'Product';
        }
      );
  }

  unitProductChange($event) {
    this.unitIdProduct = $event;
    this.unitProduct = $event ? this.unitList.find(obj => obj.parameterId.toString() === $event).name : null;
  }

  disableUnit() {
    if (this.cropFertilizerGroupList.filter(obj => obj.typeFertilizer === 'Product').length > 0) {
      return true;
    } else {
      return false;
    }
  }

  remove(index: number) {
    this.cropFertilizerGroupList.splice(index, 1);
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

  calculateProduct() {
    // this.showMessage = true;
    // setTimeout(() => {
    //   this.showMessage = false;
    // }, 3000);

    // version
    const param1 = '0345';

    // env
    const param2 = 'prod';

    // crop
    const param3 = this.cropCommonName;
    // const param3 = 'Banana';
    // const param3 = 'Common bean';

    // type
    const param4 = this.typeFertilizer;
    // const param4 = 'Product';

    // expSiteId
    const param5 = this.expSiteId;
    // const param5 = '20';

    // experimentId
    const param6 = this.expSite.experimentId;
    // const param6 = '20';


    console.log(
      {
        param1: param1,
        param2: param2,
        param3: param3.replace('/', '_').replace(' ', '_').replace('Other-', ''),
        param4: param4,
        param5: param5,
        param6: param6
      }
    );


    return this.manageDownloadService
      .rCropFertilizer(
        param1,
        param2,
        param3.replace('/', '_').replace(' ', '_').replace('Other-', ''),
        param4,
        param5,
        param6
      ).subscribe(
        (resp) => {
          console.log(resp);
          this.resStatusProduct = resp['result']['status'][0];
          this.resMsgProduct = resp['result']['msg'][0];
          this.dataTableProduct = resp['result']['table'];
        }
      );

  }

  calculateNutrient() {


    if (this.unitIdNutrient) {


      this.unitNutrient = this.unitList.find(obj => obj.parameterId === this.unitIdNutrient).name;


      // this.showMessage = true;
      // setTimeout(() => {
      //   this.showMessage = false;
      // }, 3000);

      // version
      const param1 = '0345';

      // env
      const param2 = 'prod';

      // crop
      const param3 = this.cropCommonName;
      // const param3 = 'Banana';
      // const param3 = 'Common bean';

      // type
      const param4 = this.typeFertilizer;
      // const param4 = 'Product';

      // expSiteId
      const param5 = this.expSiteId;
      // const param5 = '20';

      // experimentId
      const param6 = this.expSite.experimentId;
      // const param6 = '20';


      console.log(
        {
          param1: param1,
          param2: param2,
          param3: param3.replace('/', '_').replace(' ', '_').replace('Other-', ''),
          param4: param4,
          param5: param5,
          param6: param6
        }
      );


      return this.manageDownloadService
        .rCropFertilizer(
          param1,
          param2,
          param3.replace('/', '_').replace(' ', '_').replace('Other-', ''),
          param4,
          param5,
          param6
        ).subscribe(
          (resp) => {
            console.log(resp);
            this.resStatusNutrient = resp['result']['status'][0];
            this.resMsgNutrient = resp['result']['msg'][0];
            this.dataTableNutrient = resp['result']['table'];
          }
        );


    } else {
      this.resStatusNutrient = '400';
      this.resMsgNutrient = 'First, select unit to calculate';
    }


  }

}
