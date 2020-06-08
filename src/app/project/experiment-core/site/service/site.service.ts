import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Site } from '../model/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/site/getAll.php`);
  }

  post(site: Site) {
    return this.http.post(`${this.baseUrl}/site/post.php`, site);
  }

  delete(site: Site) {
    return this.http.delete(`${this.baseUrl}/site/delete.php?id=${site.siteId}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/site/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/site/getByExp.php?id=${id}`);
  }

  put(site: Site) {
    return this.http.put(`${this.baseUrl}/site/put.php`, site);
  }

}

