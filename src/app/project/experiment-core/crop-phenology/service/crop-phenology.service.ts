import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CropPhenology } from '../model/crop-phenology';
import { ExpSite } from '../../exp-site/model/exp-site';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Injectable({
  providedIn: 'root'
})
export class CropPhenologyService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-phenology/getAll.php`);
  }

  post(cropPhenology: CropPhenology) {
    return this.http.post(`${this.baseUrl}/crop-phenology/post.php`, cropPhenology);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-phenology/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-phenology/get.php?id=${id}`);
  }

  put(cropPhenology: CropPhenology) {
    return this.http.put(`${this.baseUrl}/crop-phenology/put.php`, cropPhenology);
  }

  putStatus(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/crop-phenology/putStatus.php`, siteCrop);
  }

  putStatusOff(expSite: ExpSite) {
    return this.http.put(`${this.baseUrl}/crop-phenology/putStatusOff.php`, expSite);
  }

  getById(siteCropId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-phenology/getById.php?siteCropId=${siteCropId}`);
  }
}
