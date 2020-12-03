import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { ExpSite } from '../../exp-site/model/exp-site';
import { ExpSiteService } from '../../exp-site/service/exp-site.service';
import { Factor } from '../../factor/model/factor';
import { FactorService } from '../../factor/service/factor.service';

@Component({
  selector: 'app-site-factor-list-i',
  templateUrl: './site-factor-list-i.component.html',
  styleUrls: ['./site-factor-list-i.component.css']
})

export class SiteFactorListIComponent implements OnInit, OnChanges {

  @Input() siteFactorList: SiteFactor[];
  @Input() experimentalDesignNumber: string;
  @Input() expSite: ExpSite;

  itemGroupList: {
    indexOrder: string,
    siteFactorList: SiteFactor[],
    treatmentList: string[]
    factorNameMain: string,
  }[] = [];

  treatmentRowList: {
    index: number,
    value: string[]
  }[];

  factorList: { id: string, value: string, info: string, form: string, multiCrop: string }[] = [];

  constructor(
    private siteFactorService: SiteFactorService,
    private expSiteService: ExpSiteService,
    private factorService: FactorService
  ) { }

  ngOnInit(): void {
    this.getFactorList();
  }

  ngOnChanges() {
    this.getAll();
    this.getTreatmentRowList();
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

    // ------ push itemGroup by index ------ //
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
          this.getTreatmentRowList();
        }
      );
  }

  getTreatmentRowList() {
    const _length = this.itemGroupList.length;
    const experimentalDesignNumberIndex: number = +this.experimentalDesignNumber;
    this.treatmentRowList = [];
    if (this.expSite.treatment) {
      for (let index = 0; index < experimentalDesignNumberIndex; index++) {
        const value: string[] = [];
        for (let index_x = 0; index_x < _length; index_x++) {
          if (this.expSite.treatment.split('|')[index]
          ) {
            if (this.expSite.treatment.split('|')[index].split(' / ')[index_x]) {
              value.push(this.expSite.treatment.split('|')[index].split(' / ')[index_x]);
            } else {
              value.push('-');
            }

          } else {
            value.push('-');
          }
        }
        const treatmentRow: { index: number, value: string[] } = { index, value };
        this.treatmentRowList.push(treatmentRow);
      }
    } else {
      for (let index = 0; index < experimentalDesignNumberIndex; index++) {
        const value = [];
        for (let index_x = 0; index_x < _length; index_x++) { value.push('-'); }
        const treatmentRow: { index: number, value: string[] } = { index, value };
        this.treatmentRowList.push(treatmentRow);
      }
    }
    this.putTreatment();
  }

  putTreatment() {
    const valueJoin: string[] = [];
    this.treatmentRowList.forEach((element, index) => {
      valueJoin.push(element.value.join(' / '));
    });

    const valueJoinString: string = valueJoin.join('|');
    this.expSite.treatment = valueJoinString;
    this.expSiteService.put(this.expSite).subscribe();
  }

  catchEmitterSiteFactorList($event: number) {
    this.remove($event);
    this.getTreatmentRowList();
  }

  remove(index: number) {
    this.itemGroupList[index].siteFactorList.forEach(obj_2 => {
      const indexAux = this.siteFactorList.indexOf(this.siteFactorList.find(obj_3 => obj_3.siteFactorId === obj_2.siteFactorId));
      this.siteFactorList.splice(indexAux, 1);
    });
    this.itemGroupList.splice(index, 1);
  }

}
