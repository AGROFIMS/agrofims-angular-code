import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Factor } from '../../factor/model/factor';
import { SiteFactor } from '../model/site-factor';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import { isNull } from 'util';
import { SiteFactorService } from '../service/site-factor.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FactorFertilizer } from '../../factor-fertilizer/model/factor-fertilizer';
import { FactorFertilizerService } from '../../factor-fertilizer/service/factor-fertilizer.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';

@Component({
  selector: 'app-site-factor-edit-vi',
  templateUrl: './site-factor-edit-vi.component.html',
  styleUrls: ['./site-factor-edit-vi.component.css']
})
export class SiteFactorEditViComponent implements OnInit, OnChanges {
  @Input() itemGroup: {
    indexOrder: string,
    siteFactorList: SiteFactor[],
    treatmentList: string[]
    factorNameMain: string,
  };
  @Input() siteFactor: SiteFactor;
  @Input() indexIG: number;
  @Input() index: number;
  @Input() expSite: ExpSite;
  @Input() factorFertilizerList: FactorFertilizer[];

  numberOfSplitsList: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  levelNameSelected: string[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  factorFertilizerListNew: FactorFertilizer[] = [];

  measurementList: StudyVariable[];

  @Output() eventEmitterSiteFactorEditVIRemove = new EventEmitter<any>();
  @Output() eventEmitterChangeUnit = new EventEmitter<boolean>();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private parameterService: ParameterService,
    private siteFactorService: SiteFactorService,
    private factorFertilizerService: FactorFertilizerService,
    private studyVariableService: StudyVariableService,
    private expSiteService: ExpSiteService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();
  }

  ngOnChanges() {
    this.get();
  }

  get() {
    try {
      this.levelNameSelected = this.siteFactor.levelName.split('|');
    } catch (error) {
      this.levelNameSelected = [];
    }
  }

  put() {
    this.siteFactorService
      .put(this.siteFactor)
      .subscribe(
        () => this.updateTreatmentList()
      );
  }

  remove(siteFactor: SiteFactor) {
    this.siteFactorService
      .delete(siteFactor.siteFactorId)
      .subscribe(
        () => {
          this.eventEmitterSiteFactorEditVIRemove.emit(this.index);
          this.updateTreatmentList();
        }
      );
  }

  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (input) {
      input.value = '';
    }
    if ((value || '').trim()) {
      const index = this.levelNameSelected.indexOf(value);
      if (index < 0) {
        this.levelNameSelected.push(value.trim());
        this.siteFactor.levelName = this.levelNameSelected.join('|');
        this.put();
        if (
          this.itemGroup.factorNameMain === 'Fertilizer type and amount' ||
          this.itemGroup.factorNameMain === 'Nutrient element type and amount'
        ) {
          this.addFactorFertilizer(
            Number(value.trim()).toString(),
            (Number(value.trim()) / Number(this.siteFactor.numberOfSplits)).toFixed(2),
            this.siteFactor.siteFactorId,
            this.siteFactor.expSiteId,
            this.itemGroup.factorNameMain,
            this.siteFactor.factorType,
            this.measurementList,
            this.factorFertilizerList,
            this.siteFactor.factorUnit,
            null,
            Number(this.siteFactor.numberOfSplits),
          );
        }
      }
    }
  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('fertilizer')
      .subscribe(
        (_productList: StudyVariable[]) => {
          this.measurementList = _productList;
        }
      );
  }

  private addFactorFertilizer(
    levelNameSplit: string,
    unitValue: string,
    siteFactorId: string,
    expSiteId: string,
    factorNameMain: string,
    factorType: string,
    measurementList: StudyVariable[],
    factorFertilizerList: FactorFertilizer[],
    unit: string,
    indexOrder: string,
    newCreations: number
  ) {
    // get newIndexOrder
    if (indexOrder === null) {
      indexOrder = '1';
      if (factorFertilizerList.filter(obj => obj.siteFactorId === siteFactorId).length > 0) {
        indexOrder = (Math
          .max
          .apply(Math, (
            factorFertilizerList.filter(obj => obj.siteFactorId === siteFactorId)
              .map(
                object => Number(object.indexOrder)
              )
          )) + 1).toString();
      }
    }

    for (let index = 0; index < newCreations; index++) {
      // get studyVariableId, typeFertilizer, productValue, elementListGroup
      let studyVariableId: string = null;
      let typeFertilizer = 'Nutrient';
      let productValue: string = null;
      const elementList = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      let elementListGroup = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
      if (factorNameMain === 'Fertilizer type and amount') {
        typeFertilizer = 'Product';
        productValue = factorType;
        if (factorType && measurementList.find(obj => obj.measurement === factorType)) {
          studyVariableId = measurementList.find(obj => obj.measurement === factorType).studyVariableId;
          elementListGroup = measurementList.find(obj => obj.measurement === factorType).variableCategory;
        }
      }
      // new  FactorFertilizer
      const factorFertilizerNew = new FactorFertilizer(
        siteFactorId,
        expSiteId,
        studyVariableId,
        typeFertilizer,
        indexOrder,
        levelNameSplit,
        productValue,
        unit,
        unitValue,
        elementList,
        elementListGroup,
        null, null, null, null, null, null, null, null, null, null, null,
        'on'
      );
      // post
      this.factorFertilizerService.post(factorFertilizerNew).subscribe(
        (val) => {
          factorFertilizerNew.factorFertilizerId = val['result'];
          factorFertilizerList.push(factorFertilizerNew);
        }
      );
    }
  }

  removeChip(levelName: string): void {
    const index = this.levelNameSelected.indexOf(levelName);
    if (index >= 0) {
      this.levelNameSelected.splice(index, 1);
      this.siteFactor.levelName = this.levelNameSelected.length > 0 ? this.levelNameSelected.join('|') : null;
      this.verifyInTreatment(this.levelNameSelected);
      this.put();
      if (
        this.itemGroup.factorNameMain === 'Fertilizer type and amount' ||
        this.itemGroup.factorNameMain === 'Nutrient element type and amount'
      ) {
        this.removeFactorFertilizer(
          (Number(levelName) / Number(this.siteFactor.numberOfSplits)).toFixed(2),
          this.siteFactor.siteFactorId
        );
      }
    }
  }

  private removeFactorFertilizer(unitValue: string, siteFactorId: string) {
    const factorFertilizerList = this.factorFertilizerList
      .filter(obj_1 => obj_1.siteFactorId === siteFactorId)
      .filter(obj_2 => obj_2.unitValue === unitValue);
    factorFertilizerList
      .forEach(factorFertilizerDelete => {
        this.factorFertilizerService.delete(factorFertilizerDelete.factorFertilizerId).subscribe(
          () => {
            this.deleteObjFromList(factorFertilizerDelete, this.factorFertilizerList);
          }
        );
      });
  }

  numberOfSplitsChange($event: number) {
    if (
      this.itemGroup.factorNameMain === 'Fertilizer type and amount' ||
      this.itemGroup.factorNameMain === 'Nutrient element type and amount'
    ) {

      const siteFactorId = this.siteFactor.siteFactorId;
      const newNumberOfSplits = $event;

      const indexOrderList = [
        ... new Set(
          this.factorFertilizerList
            .filter(obj_1 => obj_1.siteFactorId === siteFactorId)
            .map(
              (object: FactorFertilizer) =>
                object.indexOrder
            )
        )
      ];

      indexOrderList.forEach(indexOrder => {
        const factorFertilizerList = this.factorFertilizerList
          .filter(obj_1 => obj_1.siteFactorId === siteFactorId)
          .filter(obj_2 => obj_2.indexOrder === indexOrder);

        const factorFertilizerTemplate = factorFertilizerList[0];
        const levelNameSplit = factorFertilizerTemplate.levelNameSplit;
        const unitValue = (Number(factorFertilizerTemplate.levelNameSplit) / newNumberOfSplits).toFixed(2);

        if (newNumberOfSplits < factorFertilizerList.length) {
          factorFertilizerList
            .forEach((factorFertilizerDelete, index) => {
              if (index >= newNumberOfSplits) {
                this.factorFertilizerService.delete(factorFertilizerDelete.factorFertilizerId).subscribe(
                  () => {
                    this.deleteObjFromList(factorFertilizerDelete, this.factorFertilizerList);
                  }
                );
              }
            });
        }

        for (let index = 0; index < newNumberOfSplits; index++) {
          const factorFertilizer = factorFertilizerList[index];

          if (factorFertilizer) {
            factorFertilizer.unitValue = unitValue;
            this.factorFertilizerService.put(factorFertilizer).subscribe(
            );
          } else {

            this.addFactorFertilizer(
              levelNameSplit,
              unitValue,
              this.siteFactor.siteFactorId,
              this.siteFactor.expSiteId,
              this.itemGroup.factorNameMain,
              this.siteFactor.factorType,
              this.measurementList,
              this.factorFertilizerList,
              this.siteFactor.factorUnit,
              indexOrder,
              1,
            );

          }

        }

      });
    }

    this.put();
  }

  unitChange($event: number) {
    const siteFactorId = this.siteFactor.siteFactorId;
    const unit = $event.toString();

    if (
      this.itemGroup.factorNameMain === 'Fertilizer type and amount' ||
      this.itemGroup.factorNameMain === 'Nutrient element type and amount'
    ) {
      this.factorFertilizerList
        .filter(factorFertilizerFilter => factorFertilizerFilter.siteFactorId === siteFactorId)
        .forEach(factorFertilizer => {
          factorFertilizer.unit = unit;
          this.factorFertilizerService.put(factorFertilizer).subscribe();
        });
    }
    this.verifyInTreatment([]);
    this.put();

    this.eventEmitterChangeUnit.emit(true);

  }

  factorTypeChange($event: any) {
    this.siteFactor.levelNameOther = null;

    if (
      this.itemGroup.factorNameMain === 'Fertilizer type and amount' ||
      this.itemGroup.factorNameMain === 'Nutrient element type and amount'
    ) {
      this.updateFactorFertilizer(
        this.siteFactor.siteFactorId,
        this.itemGroup.factorNameMain,
        this.measurementList,
        $event
      );
    }
    this.verifyInTreatment([]);
    this.put();
  }

  updateFactorFertilizer(
    siteFactorId: string,
    factorNameMain: string,
    measurementList: StudyVariable[],
    productValue: string) {

    // get studyVariableId, typeFertilizer, productValue, elementListGroup
    let newStudyVariableId: string = null;
    let typeFertilizer = 'Nutrient';
    let newProductValue: string = null;
    // const elementList = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
    let newElementListGroup = '0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0|0.0';
    if (factorNameMain === 'Fertilizer type and amount') {
      typeFertilizer = 'Product';
      newProductValue = productValue;
      if (newProductValue && measurementList.find(obj => obj.measurement === newProductValue)) {
        newStudyVariableId = measurementList.find(obj => obj.measurement === newProductValue).studyVariableId;
        newElementListGroup = measurementList.find(obj => obj.measurement === newProductValue).variableCategory;
      }
    }

    this.factorFertilizerList
      .filter(obj_1 => obj_1.siteFactorId === siteFactorId)
      .forEach(factorFertilizer => {
        factorFertilizer.productValue = newProductValue;
        factorFertilizer.studyVariableId = newStudyVariableId;
        factorFertilizer.elementListGroup = newElementListGroup;
        this.factorFertilizerService.put(factorFertilizer).subscribe();
      });
  }

  updateTreatmentList() {

    const treatmentListAux: string[] = [];
    this.itemGroup.siteFactorList.forEach((_siteFactor: SiteFactor) => {
      if (_siteFactor.levelName) {
        _siteFactor.levelName.split('|').forEach((_levelName: string) => {
          treatmentListAux.push(
            (
              (_siteFactor.factorType) ? (
                (_siteFactor.factorType === 'Other' && _siteFactor.levelNameOther) ?
                  (_siteFactor.factorType + ' - ' + _siteFactor.levelNameOther + '_') :
                  (_siteFactor.factorType + '_')
              ) :
                ('')
            )
            +
            _levelName
            +
            (
              (_siteFactor.factorUnit) ?
                ('_' + _siteFactor.factorUnit) :
                ('')
            )
          );
        });
      }
    });

    const treatmentList = [
      ... new Set(
        treatmentListAux
          .map((object: string) => object
          )
      )
    ];

    this.itemGroup.treatmentList = treatmentList;

  }

  deleteObjFromList(obj: any, objList: any[]) {
    const index: number = objList.indexOf(obj);
    if (index !== -1) {
      objList.splice(index, 1);
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

}
