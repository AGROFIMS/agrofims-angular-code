import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SiteDesign } from '../model/site-design';

@Injectable({
  providedIn: 'root'
})
export class SiteDesignService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/site-design/getAll.php`);
  }

  post(site: SiteDesign) {
    return this.http.post(`${this.baseUrl}/site-design/post.php`, site);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/site-design/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-design/get.php?id=${id}`);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-design/getById.php?id=${id}`);
  }

  put(site: SiteDesign) {
    return this.http.put(`${this.baseUrl}/site-design/put.php`, site);
  }
}
