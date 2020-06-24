import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ExpSite } from '../model/exp-site';

@Injectable({
  providedIn: 'root'
})
export class ExpSiteService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/exp-site/getAll.php`);
  }

  post(expSite: ExpSite) {
    return this.http.post(`${this.baseUrl}/exp-site/post.php`, expSite);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/exp-site/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/exp-site/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/exp-site/getByExp.php?id=${id}`);
  }

  put(expSite: ExpSite) {
    return this.http.put(`${this.baseUrl}/exp-site/put.php`, expSite);
  }

  getFull(id: string | number) {
    return this.http.get(`${this.baseUrl}/exp-site/getFull.php?id=${id}`);
  }

}

