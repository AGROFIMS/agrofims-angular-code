import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SiteFile } from '../model/site-file';

@Injectable({
  providedIn: 'root'
})
export class SiteFileService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  post(siteFile: SiteFile) {
    return this.http.post(`${this.baseUrl}/site-file/post.php`, siteFile);
  }

  getAll() {
    return this.http.get(`${this.baseUrl}/site-file/getAll.php`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-file/get.php?id=${id}`);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/site-file/getById.php?id=${id}`);
  }

  getByUser(id: string) {
    return this.http.get(`${this.baseUrl}/site-file/getByUser.php?id=${id}`);
  }

  put(siteFile: SiteFile) {
    return this.http.put(`${this.baseUrl}/site-file/put.php`, siteFile);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/site-file/delete.php?id=${id}`);
  }

}
