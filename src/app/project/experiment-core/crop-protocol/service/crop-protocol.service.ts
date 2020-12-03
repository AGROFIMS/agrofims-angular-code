import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CropProtocol } from '../model/crop-protocol';
import { SiteCrop } from '../../site-crop/model/site-crop';

@Injectable({
  providedIn: 'root'
})
export class CropProtocolService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-protocol/getAll.php`);
  }

  post(cropProtocol: CropProtocol) {
    return this.http.post(`${this.baseUrl}/crop-protocol/post.php`, cropProtocol);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-protocol/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-protocol/get.php?id=${id}`);
  }

  put(cropProtocol: CropProtocol) {
    return this.http.put(`${this.baseUrl}/crop-protocol/put.php`, cropProtocol);
  }

  putStatus(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/crop-protocol/putStatus.php`, siteCrop);
  }

  getById(siteCropId: string | number, cropId: string | number) {
    return this.http.get(`${this.baseUrl}/crop-protocol/getById.php?siteCropId=${siteCropId}&cropId=${cropId}`);
  }
}
