import { Component, OnInit, Input, Inject } from '@angular/core';

import { ExpSiteService } from '../service/exp-site.service';
import { ExpSite } from '../model/exp-site';

import { SiteService } from '../../site/service/site.service';
import { Site } from '../../site/model/site';

import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SiteCropService } from '../../site-crop/service/site-crop.service';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { SiteFactor } from '../../site-factor/model/site-factor';
import { SiteFactorService } from '../../site-factor/service/site-factor.service';
import { SiteDesign } from '../../site-design/model/site-design';
import { SiteDesignService } from '../../site-design/service/site-design.service';

@Component({
  selector: 'app-exp-site-add',
  templateUrl: './exp-site-add.component.html',
  styleUrls: ['./exp-site-add.component.css']
})
export class ExpSiteAddComponent implements OnInit {

  siteList: Site[] = [];
  expSite: ExpSite;
  siteIList: any[];
  siteIIList: any[];
  countryName: string;
  constructor(
    private siteService: SiteService,
    private expSiteService: ExpSiteService,
    private siteCropService: SiteCropService,
    private siteFactorService: SiteFactorService,
    private siteDesignService: SiteDesignService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.get();
    this.getSiteI();
  }

  get() {
    const expSite = new ExpSite(this.data.id,
      null, null, null, null, null, null, null, null, null,
      '162', null, null, null, null, null, null, null, null, null, 'on', null, null, this.data.emailAddress);
    this.expSite = expSite;
  }

  post() {
    this.expSiteService.post(this.expSite).subscribe(
      (val) => {
        this.expSite.expSiteId = val['result'];
        this.postSiteCrop(val['result'], this.expSite.experimentId, this.expSite.siteId);
        this.postSiteDesign(val['result'], this.expSite.experimentId, this.expSite.siteId);
        this.postSiteFactor(val['result'], this.expSite.experimentId, this.expSite.siteId);
      }
    );
  }

  postSiteCrop(expSiteId: string, experimentId: string, siteId: string) {

    // mono_crop
    const ec1 = '162';
    // inter_crop
    const ec2 = '163';
    // relay_crop
    const ec3 = '164';

    const siteCrop: SiteCrop = new SiteCrop(
      expSiteId, 'Crop common name',
      null, null, null,
      null, null, null,
      'on');

    siteCrop.croppingTypeId = ec1;
    siteCrop.cropId = '57';

    this.siteCropService.post(siteCrop).subscribe(
      (val_1) => {

        const siteCropOn = ec1 + '.' + val_1['result'].toString() + '.57.Field-level/all plots|';

        siteCrop.cropId = null;
        this.siteCropService.post(siteCrop).subscribe(
          (val_2) => {

            this.expSite.siteCropsOn = siteCropOn + ec1 + '.' + val_2['result'].toString() + '.' + null + '.' + null;
            this.expSiteService.put(this.expSite).subscribe();

            siteCrop.croppingTypeId = ec2;
            siteCrop.cropId = '57';
            siteCrop.status = 'off';

            this.siteCropService.post(siteCrop).subscribe(
              () => {

                siteCrop.cropId = null;
                this.siteCropService.post(siteCrop).subscribe(
                  () => {

                    siteCrop.cropId = null;
                    this.siteCropService.post(siteCrop).subscribe(
                      () => {

                        siteCrop.cropTitle = 'First crop common name';
                        siteCrop.croppingTypeId = ec3;
                        siteCrop.cropId = '57';
                        siteCrop.status = 'off';
                        this.siteCropService.post(siteCrop).subscribe(
                          () => {

                            siteCrop.cropTitle = 'Relay crop common name';
                            siteCrop.cropId = null;
                            this.siteCropService.post(siteCrop).subscribe(
                              () => {

                                siteCrop.cropTitle = 'Relay crop common name';
                                this.siteCropService.post(siteCrop).subscribe();

                              });

                          });

                      });

                  });

              }

            );

          });

      }
    );

  }

  postSiteDesign(expSiteId: string, experimentId: string, siteId: string) {
    const siteDesign = new SiteDesign(
      expSiteId,
      '267',
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null,
      '2', '2', '2', '2', '2', '2', '2', '2', '2', 'on');
    this.siteDesignService
      .post(siteDesign)
      .subscribe();
  }

  postSiteFactor(expSiteId: string, experimentId: string, siteId: string) {

    const fd1 = 'crd';
    const fd2 = 'rcbd';
    const fd3 = 'fcrd';
    const fd4 = 'frcbd';
    const fd5 = 'sprcbd';
    const fd6 = 'spsp';
    const fd7 = 'strip';

    const siteFactor: SiteFactor = new SiteFactor(
      expSiteId,
      null,
      'Factor',
      null, null, null,
      null, null, null,
      null, null, null,
      null, null, null,
      null, null, null,
      null, 'off'
    );

    siteFactor.experimentalDesignAbbr = fd1;
    siteFactor.indexOrder = '1';

    this.siteFactorService.post(siteFactor).subscribe(
      () => {
        siteFactor.experimentalDesignAbbr = fd2;
        siteFactor.indexOrder = '1';
        this.siteFactorService.post(siteFactor).subscribe(
          () => {
            siteFactor.experimentalDesignAbbr = fd3;
            siteFactor.indexOrder = '1';
            this.siteFactorService.post(siteFactor).subscribe(
              () => {
                siteFactor.indexOrder = '2';
                this.siteFactorService.post(siteFactor).subscribe(
                  () => {
                    siteFactor.experimentalDesignAbbr = fd4;
                    siteFactor.indexOrder = '1';
                    siteFactor.status = 'on';
                    this.siteFactorService.post(siteFactor).subscribe(
                      () => {
                        siteFactor.indexOrder = '2';
                        this.siteFactorService.post(siteFactor).subscribe(
                          () => {
                            siteFactor.experimentalDesignAbbr = fd5;
                            siteFactor.indexOrder = '1';
                            siteFactor.factorTitle = 'Factor: main plot';
                            siteFactor.status = 'off';
                            this.siteFactorService.post(siteFactor).subscribe(
                              () => {
                                siteFactor.indexOrder = '2';
                                siteFactor.factorTitle = 'Factor: sub plot';
                                this.siteFactorService.post(siteFactor).subscribe(
                                  () => {
                                    siteFactor.experimentalDesignAbbr = fd6;
                                    siteFactor.indexOrder = '1';
                                    siteFactor.factorTitle = 'Factor: main plot';
                                    this.siteFactorService.post(siteFactor).subscribe(
                                      () => {
                                        siteFactor.indexOrder = '2';
                                        siteFactor.factorTitle = 'Factor: sub plot';
                                        this.siteFactorService.post(siteFactor).subscribe(
                                          () => {
                                            siteFactor.indexOrder = '3';
                                            siteFactor.factorTitle = 'Factor: sub-sub plot';
                                            this.siteFactorService.post(siteFactor).subscribe(
                                              () => {
                                                siteFactor.experimentalDesignAbbr = fd7;
                                                siteFactor.indexOrder = '1';
                                                siteFactor.factorTitle = 'Factor #1';
                                                this.siteFactorService.post(siteFactor).subscribe(
                                                  () => {
                                                    siteFactor.indexOrder = '2';
                                                    siteFactor.factorTitle = 'Factor #2';
                                                    this.siteFactorService.post(siteFactor).subscribe();
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );

          }
        );
      }
    );


  }

  getSiteI() {
    return this.siteService
      .getAll()
      .subscribe((_siteIList: any[]) => {
        this.siteIList = [...new Set(_siteIList.map(item => item.countryName))];
      });
  }

  getSiteII() {
    this.expSite.fieldbookId = 'FM' + this.data.dateYearMonth + '_' + this.countryName.replace(' ', '_');
    return this.siteService
      .getAll()
      .subscribe((_siteIIList: any[]) => {
        this.siteIIList = _siteIIList.filter(
          item => item.countryName === this.countryName
        );
      });
  }

}
