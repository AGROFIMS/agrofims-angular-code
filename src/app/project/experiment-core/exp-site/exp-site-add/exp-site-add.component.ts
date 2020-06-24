import { Component, OnInit, Input, Inject } from '@angular/core';

import { ExpSiteService } from '../service/exp-site.service';
import { ExpSite } from '../model/exp-site';

import { SiteService } from '../../site/service/site.service';
import { Site } from '../../site/model/site';

import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exp-site-add',
  templateUrl: './exp-site-add.component.html',
  styleUrls: ['./exp-site-add.component.css']
})
export class ExpSiteAddComponent implements OnInit {

  siteList: Site[] = [];

  expSite = new ExpSite(this.data.id, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'on');

  siteIList: any[];
  siteIIList: any[];

  countryName = new FormControl();

  constructor(
    private siteService: SiteService,
    private expSiteService: ExpSiteService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getSiteI();
  }

  save() {
    this.expSiteService.post(this.expSite).subscribe();
  }

  getSiteI() {
    return this.siteService
      .getAll()
      .subscribe((_siteIList: any[]) => {
        this.siteIList = [...new Set(_siteIList.map(item => item.countryName))];
      });
  }

  getSiteII() {
    return this.siteService
      .getAll()
      .subscribe((_siteIIList: any[]) => {
        this.siteIIList = _siteIIList.filter(
          item => item.countryName === this.countryName.value
        );
      });
  }


}
