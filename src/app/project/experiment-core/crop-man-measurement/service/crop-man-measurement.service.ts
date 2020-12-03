import { Injectable } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { CropManMeasurement } from '../model/crop-man-measurement';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CropManMeasurementService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-man-measurement/getAll.php`);
  }

  post(cropProtocol: CropManMeasurement) {
    return this.http.post(`${this.baseUrl}/crop-man-measurement/post.php`, cropProtocol);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-man-measurement/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-man-measurement/get.php?id=${id}`);
  }

  put(cropProtocol: CropManMeasurement) {
    return this.http.put(`${this.baseUrl}/crop-man-measurement/put.php`, cropProtocol);
  }

  putStatus(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/crop-man-measurement/putStatus.php`, siteCrop);
  }

  getById(siteCropId: string | number, cropId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-man-measurement/getById.php?siteCropId=${siteCropId}&cropId=${cropId}`);
  }
}
