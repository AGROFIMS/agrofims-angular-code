import { Component, OnInit } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  site: Site[] = [];

  displayedColumns: string[] = ['id', 'sId', 'name', 'countryName', 'date', 'action'];

  constructor(
    private siteService: SiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSites();
  }

  getSites() {
    return this.siteService
      .getAll()
      .subscribe((site: Site[]) => {
        this.site = site;
        // this.ivan = experiment;
      });
  }

  addSite() {
    this.router.navigate(['/sites/add']);
  }

  deleteSite(site: Site) {
    this.siteService
      .delete(site)
      .subscribe(() => {
        this.getSites();
      });
  }

  editSite(id: any) {
    this.router.navigate(['/sites/edit', id]);
  }

}
