import { Component, OnInit, ViewChild } from '@angular/core';
import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { Router } from '@angular/router';
import {
  icon, latLng, Layer, MapOptions, Map, Marker, point, polyline, tileLayer
} from 'leaflet';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {
  constructor(
    private siteService: SiteService,
    private router: Router,
    private authService: AuthService,
  ) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['#', 'sId', 'name', 'countryName', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();

  siteList: Site[] = [];
  siteMarkerList: {
    siteId: string,
    marker: Marker
  }[] = [];
  mapOptions: MapOptions;
  map: Map;

  ngOnInit(): void {
    this.getSites();
    this.initializeMapOptions();
  }

  onMapReady(_map: Map) {
    this.map = _map;
  }

  getSites() {
    return this.siteService
      .getAll()
      .subscribe((_siteList: Site[]) => {

        const username = this.authService.getUsername();

        if (username === 'admin') {
          const siteList = _siteList;
          this.siteList = siteList;
          siteList.forEach(_site => {
            if (_site.latitude && _site.longitude) {
              const message: string = '<p><b>' + _site.name.toUpperCase() + '</b></p>'
                + '<b>' + _site.countryName + ', ' + _site.firstLevel + '</b> - <small>' + _site.secondLevel + '</small>'
                + '<br>Longitude: ' + _site.longitude
                + '<br>Latitude: ' + _site.latitude;

              this.addSampleMarker(_site.siteId, Number(_site.latitude), Number(_site.longitude), message);
            }
          });
          this.loadDatasource(siteList);
        } else {
          const siteList = _siteList.filter(site => site.emailAddress === username);
          this.siteList = siteList;
          siteList.forEach(_site => {
            if (_site.latitude && _site.longitude) {
              const message: string = '<p><b>' + _site.name.toUpperCase() + '</b></p>'
                + '<b>' + _site.countryName + ', ' + _site.firstLevel + '</b> - <small>' + _site.secondLevel + '</small>'
                + '<br>Longitude: ' + _site.longitude
                + '<br>Latitude: ' + _site.latitude;

              this.addSampleMarker(_site.siteId, Number(_site.latitude), Number(_site.longitude), message);
            }
          });
          this.loadDatasource(siteList);
        }

      });
  }

  loadDatasource(objectList: any[]) {
    this.dataSource = new MatTableDataSource(objectList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  initializeMapOptions() {
    this.mapOptions = {
      center: latLng(0, 0),
      zoom: 2,
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

  private addSampleMarker(siteId: string, lat: number, lng: number, message: string) {
    const marker = new Marker([0, 0]);
    marker.setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      }));
    marker.setLatLng([lat, lng]);
    marker.bindPopup(message).openPopup();
    marker.addTo(this.map);
    const siteMarker: {
      siteId: string,
      marker: Marker
    } = {
      siteId,
      marker
    };
    this.siteMarkerList.push(siteMarker);
  }

  help() {
    window.open("https://agrofims.github.io/helpdocs/creatingasite/site/", "_blank");
  }

  addSite() {
    this.router.navigate(['/sites/add']);
  }

  deleteSite(site: Site) {
    this.siteService
      .delete(site)
      .subscribe(() => {

        const siteMarker = this.siteMarkerList.find(obj => obj.siteId === site.siteId);
        siteMarker.marker.removeFrom(this.map);
        this.deleteObjFromList(siteMarker, this.siteList);
        this.deleteObjFromList(site, this.siteList);
        this.loadDatasource(this.siteList);

      });
  }

  editSite(id: any) {
    this.router.navigate(['/sites/edit', id]);
  }

  deleteObjFromList(obj: any, objList: any[]) {
    const index: number = objList.indexOf(obj);
    if (index !== -1) {
      objList.splice(index, 1);
    }
  }

}
