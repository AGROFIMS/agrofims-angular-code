import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class GeomapService {
  baseUrl = environment.baseUrl;

  key = 'AIzaSyAPWYHA8LkSrhnr1XxBFHuJ3aWeqi-N5lQ';

  constructor(private http: HttpClient) { }

  get(address: string) {
    return this.http.get(`${this.baseUrl}/geomap/get.php?key=${this.key}&address=${address}`);
  }

}