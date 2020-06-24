import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Crop } from '../model/crop';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop/getAll.php`);
  }

  post(crop: Crop) {
    return this.http.post(`${this.baseUrl}/crop/post.php`, crop);
  }

  delete(crop: Crop) {
    return this.http.delete(`${this.baseUrl}/crop/delete.php?id=${crop.cropId}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop/getByExp.php?id=${id}`);
  }

  put(crop: Crop) {
    return this.http.put(`${this.baseUrl}/crop/put.php`, crop);
  }

}

