import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SiteService } from '../service/site.service';
import { Site } from '../model/site';
import { Router } from '@angular/router';

import { GeospatialData } from '../../geospatial-data/model/geospatial-data';
import { GeospatialDataService } from '../../geospatial-data/service/geospatial-data.service';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';

import { ChangeDetectorRef } from '@angular/core';
import {
  icon, latLng, Layer, MapOptions, Map, Marker, point, polyline, tileLayer, LatLng
} from 'leaflet';
import { GeomapService } from '../service/geomap.service';
import { Geomap } from '../model/geomap';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-site-add',
  templateUrl: './site-add.component.html',
  styleUrls: ['./site-add.component.css']
})
export class SiteAddComponent implements OnInit {

  constructor(
    private geospatialDataService: GeospatialDataService,
    private siteService: SiteService,
    private parameterService: ParameterService,
    private router: Router,
    private cref: ChangeDetectorRef,
    private geomapService: GeomapService,
    private authService: AuthService,
  ) { }

  random: string = Math.random().toString(36).substring(7).toUpperCase();



  site = new Site(
    this.random,
    null, null, null,
    null, null, null,
    null, null, null,
    null, null, null,
    null, null, 'on',
    null, null, null);
  mapOptions: MapOptions;
  map: Map;

  geospatialDataCountryList: { index: string; name: string }[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  geospatialDataList: GeospatialData[] = [];

  myControl1 = new FormControl();
  filteredOptions1: Observable<string[]>;
  myControl2 = new FormControl();
  filteredOptions2: Observable<string[]>;
  myControl3 = new FormControl();
  filteredOptions3: Observable<string[]>;
  myControl4 = new FormControl();
  filteredOptions4: Observable<string[]>;
  myControl5 = new FormControl();
  filteredOptions5: Observable<string[]>;

  parameterList: Parameter[];

  placeholder1: string;
  placeholder2: string;
  placeholder3: string;
  placeholder4: string;
  placeholder5: string;

  address: string;
  marker = new Marker([0, 0]);
  public geomap: Geomap;

  @ViewChild('siteTypeId') siteTypeId: ElementRef;



  ngOnInit(): void {

    this.initializeMapOptions();

    this.getGeospatialDataCountryList();

    this.getParameterList();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredOptions1 = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      );

    this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );

    this.filteredOptions3 = this.myControl3.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter3(value))
      );

    this.filteredOptions4 = this.myControl4.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter4(value))
      );

    this.filteredOptions5 = this.myControl5.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter5(value))
      );

    setTimeout(() => {
      try {
        this.siteTypeId.nativeElement.focus();
      } catch (error) {
      }
    }, 1000);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    this.cref.detectChanges();
  }

  onMapReady(_map: Map) {
    this.map = _map;
    this.addSampleMarker(0, 0);
  }

  getLocation(zoomScale: number, address: string) {
    this.geomapService.get(address.replace(/ /g, '')).subscribe(
      (val: any[]) => {
        if (val['result'] !== null) {
          if (val['result']['status'] === 'OK') {
            this.geomap = this.convertToGeomap(val['result']['results'][0]);

            this.marker.setLatLng(this.geomap.geometry.location);

            this.map.fitBounds(
              [
                [
                  this.geomap.geometry.bounds.northeast.lat,
                  this.geomap.geometry.bounds.northeast.lng
                ], [
                  this.geomap.geometry.bounds.southwest.lat,
                  this.geomap.geometry.bounds.southwest.lng
                ]
              ]
            );

            this.site.northeast =
              this.geomap.geometry.bounds.northeast.lat.toFixed(5)
              + '|' +
              this.geomap.geometry.bounds.northeast.lng.toFixed(5);

            this.site.southwest =
              this.geomap.geometry.bounds.southwest.lat.toFixed(5)
              + '|' +
              this.geomap.geometry.bounds.southwest.lng.toFixed(5);

            this.site.latitude = this.geomap.geometry.location.lat.toFixed(5);
            this.site.longitude = this.geomap.geometry.location.lng.toFixed(5);

          } else {
            this.geomap = null;
          }
        } else {
          this.geomap = null;
          console.log('...address without valid data');
        }
      }
    );
  }

  convertToGeomap(dataLocation: any): Geomap {

    let lat: number;
    let lng: number;

    let northeast: {
      lat: number,
      lng: number
    };

    let southwest: {
      lat: number,
      lng: number
    };

    const address_components: {
      long_name: string,
      short_name: string
    }[] = [];

    dataLocation['address_components'].forEach((address_component: any) => {
      const long_name = address_component['long_name'];
      const short_name = address_component['short_name'];

      const _address_component: {
        long_name: string,
        short_name: string
      } = {
        long_name,
        short_name
      };
      address_components.push(_address_component);
    });

    const formatted_address: string = dataLocation['formatted_address'];

    lat = dataLocation['geometry']['bounds']['northeast']['lat'];
    lng = dataLocation['geometry']['bounds']['northeast']['lng'];

    northeast = {
      lat,
      lng
    };

    lat = dataLocation['geometry']['bounds']['southwest']['lat'];
    lng = dataLocation['geometry']['bounds']['southwest']['lng'];

    southwest = {
      lat,
      lng
    };

    const bounds: {
      northeast: {
        lat: number,
        lng: number
      },
      southwest: {
        lat: number,
        lng: number
      }
    } = {
      northeast,
      southwest
    };

    lat = dataLocation['geometry']['location']['lat'];
    lng = dataLocation['geometry']['location']['lng'];

    const location: {
      lat: number,
      lng: number
    } = {
      lat,
      lng
    };

    const location_type: string = dataLocation['geometry']['location_type'];

    lat = dataLocation['geometry']['viewport']['northeast']['lat'];
    lng = dataLocation['geometry']['viewport']['northeast']['lng'];

    northeast = {
      lat,
      lng
    };

    lat = dataLocation['geometry']['viewport']['southwest']['lat'];
    lng = dataLocation['geometry']['viewport']['southwest']['lng'];

    southwest = {
      lat,
      lng
    };

    const viewport: {
      northeast: {
        lat: number,
        lng: number
      },
      southwest: {
        lat: number,
        lng: number
      }
    } = {
      northeast,
      southwest
    };

    const geometry: {
      bounds: {
        northeast: {
          lat: number,
          lng: number
        },
        southwest: {
          lat: number,
          lng: number
        }
      },
      location: {
        lat: number,
        lng: number
      },
      location_type: string,
      viewport: {
        northeast: {
          lat: number,
          lng: number
        },
        southwest: {
          lat: number,
          lng: number
        }
      },
    } = {
      bounds,
      location,
      location_type,
      viewport
    };

    const partial_match: boolean = dataLocation['partial_match'];
    const place_id: string = dataLocation['place_id'];

    const types: string[] = [];
    dataLocation['types'].forEach((_types: string) => {
      types.push(_types);
    });

    const geomap = new Geomap(address_components, formatted_address, geometry, partial_match, place_id, types);

    return geomap;
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

  onMapClick($event: any) {
    this.marker.setOpacity(1);
    this.marker.setLatLng($event['latlng']);
    this.site.latitude = $event['latlng']['lat'].toFixed(5);
    this.site.longitude = $event['latlng']['lng'].toFixed(5);
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

  getGeospatialDataCountryList() {
    return this.geospatialDataService
      .getAll()
      .subscribe(
        (_geospatialDataCountryList: GeospatialData[]) => {
          _geospatialDataCountryList.forEach(element => {
            const index = element.GID_0;
            const name = element.NAME_0;
            const geospatialDataCountry: { index: string, name: string } = { index, name };
            this.geospatialDataCountryList.push(geospatialDataCountry);
          });
          this.myControl.setValue('');
        }
      );
  }

  post() {
    if (!this.site.name) {
      this.site.name = this.site.sId + '-' + this.myControl.value;
    }

    const emailAddress = this.authService.getUsername();

    this.site.countryName = this.myControl.value;
    this.site.firstLevel = this.myControl1.value;
    this.site.secondLevel = this.myControl2.value;
    this.site.thirdLevel = this.myControl3.value;
    this.site.fourthLevel = this.myControl4.value;
    this.site.fifthLevel = this.myControl5.value;
    this.site.emailAddress = emailAddress;

    this.siteService.post(this.site).subscribe(
      (val) => {
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

  getGeospatialDataList(value: string) { // Country
    return this.geospatialDataService
      .get(value)
      .subscribe(
        (_geospatialDataList: GeospatialData[]) => {
          this.geospatialDataList = _geospatialDataList;

          this.getLocation(2, value);

          this.myControl1.setValue('');
          this.myControl2.setValue('');
          this.myControl3.setValue('');
          this.myControl4.setValue('');
          this.myControl5.setValue('');
        }
      );
  }

  getGeospatialDataList1(value: string) {


    this.getLocation(3,
      this.myControl.value + '|' + value);

    this.myControl2.setValue('');
    this.myControl3.setValue('');
    this.myControl4.setValue('');
    this.myControl5.setValue('');

  }

  getGeospatialDataList2(value: string) {

    this.getLocation(4,
      this.myControl.value + '|' +
      this.myControl1.value + '|' +
      value);

    this.myControl3.setValue('');
    this.myControl4.setValue('');
    this.myControl5.setValue('');
  }

  getGeospatialDataList3(value: string) {

    this.getLocation(5,
      this.myControl.value + '|' +
      this.myControl1.value + '|' +
      this.myControl2.value + '|' +
      value);

    this.myControl4.setValue('');
    this.myControl5.setValue('');
  }

  getGeospatialDataList4(value: string) {
    this.getLocation(6,
      this.myControl.value + '|' +
      this.myControl1.value + '|' +
      this.myControl2.value + '|' +
      this.myControl3.value + '|' +
      value);
    this.myControl5.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.geospatialDataCountryList.forEach(element => {
      optionList.push(element.name);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    let optionList: string[] = [];
    optionList = [...new Set(this.geospatialDataList
      .map(item => item.NAME_1))];

    if (optionList.length === 0 || (optionList.length === 1 && optionList[0] === 'NA')) {
      this.placeholder1 = '';
      return [];
    } else {
      this.placeholder1 = 'Select admin 1';
      return optionList.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filter2(value: string): string[] {
    const filterValue = value.toLowerCase();
    let optionList: string[] = [];
    optionList = [...new Set(this.geospatialDataList
      .filter(item => item.NAME_1 === this.myControl1.value)
      .map(item => item.NAME_2))];

    if (optionList.length === 0 || (optionList.length === 1 && optionList[0] === 'NA')) {
      this.placeholder2 = '';
      return [];
    } else {
      this.placeholder2 = 'Select admin 2';
      return optionList.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filter3(value: string): string[] {
    const filterValue = value.toLowerCase();
    let optionList: string[] = [];
    optionList = [...new Set(this.geospatialDataList
      .filter(item => item.NAME_1 === this.myControl1.value
        && item.NAME_2 === this.myControl2.value)
      .map(item => item.NAME_3))];

    if (optionList.length === 0 || (optionList.length === 1 && optionList[0] === 'NA')) {
      this.placeholder3 = '';
      return [];
    } else {
      this.placeholder3 = 'Select admin 3';
      return optionList.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filter4(value: string): string[] {
    const filterValue = value.toLowerCase();
    let optionList: string[] = [];
    optionList = [...new Set(this.geospatialDataList
      .filter(item => item.NAME_1 === this.myControl1.value
        && item.NAME_2 === this.myControl2.value
        && item.NAME_3 === this.myControl3.value)
      .map(item => item.NAME_4))];

    if (optionList.length === 0 || (optionList.length === 1 && optionList[0] === 'NA')) {
      this.placeholder4 = '';
      return [];
    } else {
      this.placeholder4 = 'Select admin 4';
      return optionList.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  private _filter5(value: string): string[] {
    const filterValue = value.toLowerCase();
    let optionList: string[] = [];
    optionList = [...new Set(this.geospatialDataList
      .filter(item => item.NAME_1 === this.myControl1.value
        && item.NAME_2 === this.myControl2.value
        && item.NAME_3 === this.myControl3.value
        && item.NAME_4 === this.myControl4.value)
      .map(item => item.NAME_5))];

    if (optionList.length === 0 || (optionList.length === 1 && optionList[0] === 'NA')) {
      this.placeholder5 = '';
      return [];
    } else {
      this.placeholder5 = 'Select admin 5';
      return optionList.filter(option => option.toLowerCase().includes(filterValue));
    }
  }
}
