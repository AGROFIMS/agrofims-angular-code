import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import {
  icon, latLng, Layer, MapOptions, Map, Marker, point, polyline, tileLayer, LatLng
} from 'leaflet';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.css']
})
export class SiteEditComponent implements OnInit {

  site: Site = new Site('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'on', '', '');
  map: Map;
  mapOptions: MapOptions;
  marker = new Marker([0, 0]);
  parameterList: Parameter[];

  @ViewChild('siteTypeId') siteTypeId: ElementRef;

  constructor(
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router,
    private parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    const siteId = this.route.snapshot.paramMap.get('id');
    this.getSite(siteId);
    this.initializeMapOptions();

    this.getParameterList();

    setTimeout(() => {
      try {
        this.siteTypeId.nativeElement.focus();
      } catch (error) {
      }
    }, 1000);
  }

  getSite(siteId: string) {
    this.siteService
      .get(siteId)
      .subscribe(
        (_site: Site) => {
          this.site = _site;

          this.marker.setOpacity(1);



          this.marker.setLatLng(latLng(Number(this.site.latitude), Number(this.site.longitude)));


          this.map.fitBounds(
            [
              [
                Number(this.site.northeast.split('|')[0]),
                Number(this.site.northeast.split('|')[1])
              ], [
                Number(this.site.southwest.split('|')[0]),
                Number(this.site.southwest.split('|')[1])
              ]
            ]
          );


        }
      );
  }


  onMapReady(_map: Map) {
    this.map = _map;
    this.addSampleMarker(0, 0);
  }

  private addSampleMarker(lat: number, lng: number) {
    this.marker
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        }));
    this.marker.setOpacity(0);
    this.marker.setLatLng([lat, lng]);
    this.marker.addTo(this.map);
  }

  initializeMapOptions() {
    this.mapOptions = {
      center: latLng(0, 0),
      zoom: 1,
      layers: [
        tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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

  getParameterList() {
    return this.parameterService
      .getAll('site', 'type')
      .subscribe(
        (_parameterList: Parameter[]) => {
          this.parameterList = _parameterList;
        }
      );
  }
}
