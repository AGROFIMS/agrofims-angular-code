import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeospatialDataService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/geospatial-data/getAll.php`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/geospatial-data/get.php?id=${id}`);
  }

}
