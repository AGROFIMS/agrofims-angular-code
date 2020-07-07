import { Component, OnInit } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { Router } from '@angular/router';

import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  site: Site[] = [];

  displayedColumns: string[] = ['#', 'sId', 'siteTypeId', 'name', 'countryName', 'date', 'action'];

  mapOptions: MapOptions;

  constructor(
    private siteService: SiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSites();

    this.initializeMapOptions();
  }

  initializeMapOptions() {
    this.mapOptions = {
      center: latLng(0, 0),
      zoom: 2,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
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
