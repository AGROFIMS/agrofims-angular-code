import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SiteCrop } from '../model/site-crop';

@Injectable({
  providedIn: 'root'
})
export class SiteCropService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/site-crop/getAll.php`);
  }

  post(siteCrop: SiteCrop) {
    return this.http.post(`${this.baseUrl}/site-crop/post.php`, siteCrop);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/site-crop/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-crop/get.php?id=${id}`);
  }

  put(siteCrop: SiteCrop) {
    return this.http.put(`${this.baseUrl}/site-crop/put.php`, siteCrop);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-crop/getById.php?id=${id}`);
  }

}


