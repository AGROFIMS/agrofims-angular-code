import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CropManPractices } from '../model/crop-man-practices';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Injectable({
  providedIn: 'root'
})
export class CropManPracticesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-man-practices/getAll.php`);
  }

  post(cropManPractices: CropManPractices) {
    return this.http.post(`${this.baseUrl}/crop-man-practices/post.php`, cropManPractices);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-man-practices/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-man-practices/get.php?id=${id}`);
  }

  put(cropManPractices: CropManPractices) {
    return this.http.put(`${this.baseUrl}/crop-man-practices/put.php`, cropManPractices);
  }

  putStatus(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/crop-man-practices/putStatus.php`, siteCrop);
  }

  getById(expSiteId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-man-practices/getById.php?expSiteId=${expSiteId}`);
  }
}
