import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { ExpSite } from '../../exp-site/model/exp-site';
import { Factor } from '../../factor/model/factor';
import { FactorService } from '../../factor/service/factor.service';

@Component({
  selector: 'app-site-factor-list-ii',
  templateUrl: './site-factor-list-ii.component.html',
  styleUrls: ['./site-factor-list-ii.component.css']
})

export class SiteFactorListIiComponent implements OnInit, OnChanges {

  @Input() siteFactorList: SiteFactor[];
  @Input() experimentalDesignNumber: string;
  @Input() expSite: ExpSite;

  itemGroupList: {
    indexOrder: string,
    siteFactorList: SiteFactor[],
    treatmentList: string[]
    factorNameMain: string,
  }[] = [];

  factorList: { id: string, value: string, info: string, form: string, multiCrop: string }[] = [];

  constructor(
    private siteFactorService: SiteFactorService,
    private factorService: FactorService
  ) { }

  ngOnInit(): void {
    this.getFactorList();
  }

  ngOnChanges() {
    this.getAll();
  }

  getFactorList() {
    return this.factorService
      .getAll()
      .subscribe(
        (_factorList: Factor[]) => {
          _factorList
            .forEach(element => {
              const id = element.factorId;
              const value = element.factorName;
              const info = element.adInfo;
              const form = element.form;
              const multiCrop = element.multiCrop;

              const factor: {
                id: string, value: string, info: string, form: string, multiCrop: string
              } = {
                id, value, info, form, multiCrop
              };

              this.factorList.push(factor);
            });
        }
      );
  }

  getAll() {
    this.itemGroupList = [];
    const siteFactorListFiltered = this.siteFactorList.filter(obj => obj.status === 'on');
    const indexOrderList = [
      ... new Set(
        siteFactorListFiltered
          .map(
            (object: SiteFactor) =>
              object.indexOrder
          )
      )
    ];

    indexOrderList.forEach(element => {

      const indexOrder: string = element;
      const siteFactorList = siteFactorListFiltered.filter((option: SiteFactor) => option.indexOrder === element);
      const treatmentListAux: string[] = [];
      let factorNameMain: string = null;

      siteFactorList.forEach((_siteFactor: SiteFactor) => {

        factorNameMain = _siteFactor.factorName;
        if (_siteFactor.levelName) {
          _siteFactor.levelName.split('|').forEach((_levelName: string) => {
            treatmentListAux.push(
              (
                (_siteFactor.factorType === 'Other' && _siteFactor.levelNameOther) ?
                  (_siteFactor.factorType + ' - ' + _siteFactor.levelNameOther + '_') :
                  (
                    (_siteFactor.factorType && factorNameMain !== 'Other') ?
                      (_siteFactor.factorType + '_') :
                      ('')
                  )
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

      const itemGroup: {
        indexOrder: string,
        siteFactorList: SiteFactor[],
        treatmentList: string[],
        factorNameMain: string
      } = {
        indexOrder,
        siteFactorList,
        treatmentList,
        factorNameMain
      };
      this.itemGroupList.push(itemGroup);

    });
  }

  post() {
    let newIndexOrder = 1;
    if (this.itemGroupList.length > 0) {
      newIndexOrder = Math
        .max
        .apply(Math, (
          this.itemGroupList
            .map(
              object => Number(object.indexOrder)
            )
        )) + 1;
    }

    const expSiteId = this.itemGroupList[0].siteFactorList[0].expSiteId;
    const experimentalDesignAbbr = this.itemGroupList[0].siteFactorList[0].experimentalDesignAbbr;

    const siteFactor = new SiteFactor(
      expSiteId,
      null,
      'Factor',
      null, null,
      experimentalDesignAbbr,
      null, newIndexOrder.toString(), null, null,
      null, null, null,
      null, null, null,
      null, null, null,
      'on');

    this.siteFactorService.post(siteFactor)
      .subscribe(
        (val) => {
          siteFactor.siteFactorId = val['result'];
          const indexOrder = newIndexOrder.toString();
          const siteFactorList = [];
          const treatmentList = [];
          const factorNameMain = null;

          siteFactorList.push(siteFactor);

          const itemGroup: {
            indexOrder: string,
            siteFactorList: SiteFactor[],
            treatmentList: string[],
            factorNameMain: string
          } = {
            indexOrder,
            siteFactorList,
            treatmentList,
            factorNameMain
          };
          this.itemGroupList.push(itemGroup);
          this.siteFactorList.push(siteFactor);
        }
      );
  }

  catchEmitterSiteFactorList($event) {
    this.remove($event);
  }

  remove(index: number) {
    this.itemGroupList[index].siteFactorList.forEach(obj_2 => {
      const indexAux = this.siteFactorList.indexOf(this.siteFactorList.find(obj_3 => obj_3.siteFactorId === obj_2.siteFactorId))
      this.siteFactorList.splice(indexAux, 1);
    });
    this.itemGroupList.splice(index, 1);
  }

}
