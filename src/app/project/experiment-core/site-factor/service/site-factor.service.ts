import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SiteFactor } from '../model/site-factor';

@Injectable({
  providedIn: 'root'
})
export class SiteFactorService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/site-factor/getAll.php`);
  }

  post(siteFactor: SiteFactor) {
    return this.http.post(`${this.baseUrl}/site-factor/post.php`, siteFactor);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/site-factor/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-factor/get.php?id=${id}`);
  }

  getById(expSiteId: string) {
    return this.http.get(`${this.baseUrl}/site-factor/getById.php?expSiteId=${expSiteId}`);
  }

  put(siteFactor: SiteFactor) {
    return this.http.put(`${this.baseUrl}/site-factor/put.php`, siteFactor);
  }

  putStatus(siteFactor: SiteFactor) {
    return this.http.put(`${this.baseUrl}/site-factor/putStatus.php`, siteFactor);
  }
}
