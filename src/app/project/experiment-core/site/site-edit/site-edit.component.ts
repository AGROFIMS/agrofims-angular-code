import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.css']
})
export class SiteEditComponent implements OnInit {

  site: Site = new Site('', '', '', '', '', '', '', '', '', '', '', '', '', 'on');

  mapOptions: MapOptions;
  @ViewChild('siteTypeId') siteTypeId: ElementRef;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    this.siteService.get(siteId).subscribe((site: Site) => this.site = site);

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
    this.siteService.put(this.site).subscribe(() => {
      this.router.navigate(['/sites']);
    });
  }

  back() {
    this.router.navigate(['/sites']);
  }

}
