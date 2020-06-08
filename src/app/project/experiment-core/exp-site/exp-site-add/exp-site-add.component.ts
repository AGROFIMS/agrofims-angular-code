import { Component, OnInit } from '@angular/core';

import { ExpSiteService } from '../service/exp-site.service';
import { ExpSite } from '../model/exp-site';

@Component({
  selector: 'app-exp-site-add',
  templateUrl: './exp-site-add.component.html',
  styleUrls: ['./exp-site-add.component.css']
})
export class ExpSiteAddComponent implements OnInit {

  expSite = new ExpSite(null, null, null, null, null, null, null, null, null, null, 'on');

  constructor(
    private expSiteService: ExpSiteService
  ) { }

  ngOnInit(): void {
  }

  save() {
    this.expSiteService.post(this.expSite).subscribe();
  }

}
