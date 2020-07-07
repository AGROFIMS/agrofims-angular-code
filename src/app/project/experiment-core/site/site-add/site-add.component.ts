import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { Router } from '@angular/router';
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-site-add',
  templateUrl: './site-add.component.html',
  styleUrls: ['./site-add.component.css']
})
export class SiteAddComponent implements OnInit {

  random: string = Math.random().toString(36).substring(7).toUpperCase();
  site = new Site(this.random, null, null, null, 'test', 'test', null, null, null, null, null, null, null, 'on');

  mapOptions: MapOptions;
  @ViewChild('siteTypeId') siteTypeId: ElementRef;

  constructor(
    private siteService: SiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeMapOptions();

    setTimeout(() => {
      this.siteTypeId.nativeElement.focus();
    }, 1000);
  }

  initializeMapOptions() {
    this.mapOptions = {
      center: latLng(0, 0),
      zoom: 1,
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

  onSubmit() {
    this.siteService.post(this.site).subscribe(() => {
      this.router.navigate(['/sites']);
    });
  }

  back() {
    this.router.navigate(['/sites']);
  }

}
