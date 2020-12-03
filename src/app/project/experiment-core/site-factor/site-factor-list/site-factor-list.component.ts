import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteFactor } from '../model/site-factor';
import { SiteFactorService } from '../service/site-factor.service';
import { SiteDesign } from '../../site-design/model/site-design';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Component({
  selector: 'app-site-factor-list',
  templateUrl: './site-factor-list.component.html',
  styleUrls: ['./site-factor-list.component.css']
})
export class SiteFactorListComponent implements OnInit, OnChanges {

  @Input() siteFactorList: SiteFactor[];
  @Input() siteDesign: SiteDesign;
  @Input() expSite: ExpSite;

  crd = '264';
  rcbd = '265';
  fcrd = '266';
  frcbd = '267';
  sprcbd = '268';
  spsp = '269';
  strip = '270';

  itemGroupList: { indexOrder: string, siteFactorList: SiteFactor[] }[] = [];
  constructor(
    private siteFactorService: SiteFactorService,
  ) { }

  ngOnInit(): void { }

  ngOnChanges() { }

}
