import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CropMeasurement } from '../model/crop-measurement';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Injectable({
  providedIn: 'root'
})
export class CropMeasurementService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-measurement/getAll.php`);
  }

  post(cropMeasurement: CropMeasurement) {
    return this.http.post(`${this.baseUrl}/crop-measurement/post.php`, cropMeasurement);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-measurement/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-measurement/get.php?id=${id}`);
  }

  put(cropMeasurement: CropMeasurement) {
    return this.http.put(`${this.baseUrl}/crop-measurement/put.php`, cropMeasurement);
  }

  putStatus(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/crop-measurement/putStatus.php`, siteCrop);
  }

  putStatusOff(expSite: ExpSite) {
    return this.http.put(`${this.baseUrl}/crop-measurement/putStatusOff.php`, expSite);
  }

  getById(siteCropId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-measurement/getById.php?siteCropId=${siteCropId}`);
  }

  getByExpId(expSiteId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-measurement/getByExpId.php?expSiteId=${expSiteId}`);
  }
}
