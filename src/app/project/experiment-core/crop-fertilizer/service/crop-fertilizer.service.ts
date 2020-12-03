import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CropFertilizer } from '../model/crop-fertilizer';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Injectable({
  providedIn: 'root'
})
export class CropFertilizerService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-fertilizer/getAll.php`);
  }

  post(cropFertilizer: CropFertilizer) {
    return this.http.post(`${this.baseUrl}/crop-fertilizer/post.php`, cropFertilizer);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-fertilizer/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-fertilizer/get.php?id=${id}`);
  }

  put(cropFertilizer: CropFertilizer) {
    return this.http.put(`${this.baseUrl}/crop-fertilizer/put.php`, cropFertilizer);
  }

  putStatus(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/crop-fertilizer/putStatus.php`, siteCrop);
  }

  putStatusOff(expSite: ExpSite) {
    return this.http.put(`${this.baseUrl}/crop-fertilizer/putStatusOff.php`, expSite);
  }

  getById(siteCropId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-fertilizer/getById.php?siteCropId=${siteCropId}`);
  }
}
