import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SiteCrop } from '../model/site-crop';
import { ExpSite } from '../../exp-site/model/exp-site';

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

  putStatus(expSite: ExpSite) {
    return this.http.put(`${this.baseUrl}/site-crop/putStatus.php`, expSite);
  }

  getById(id1: string | number) {
    return this.http.get(`${this.baseUrl}/site-crop/getById.php?id1=${id1}`);
  }
}


