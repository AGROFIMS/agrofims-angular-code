import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Experiment } from '../model/experiment';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/experiment/getAll.php`);
  }

  post(experiment: Experiment) {
    return this.http.post(`${this.baseUrl}/experiment/post.php`, experiment);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/experiment/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/experiment/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/experiment/getByExp.php?id=${id}`);
  }

  put(experiment: Experiment) {
    return this.http.put(`${this.baseUrl}/experiment/put.php`, experiment);
  }

  rSend(id: string | number) {
    const ver = 'version';
    const env = 'environment';
    return this.http.get(`${this.baseUrl}/r-connection/rSend.php?id=${id}&ver=${ver}&env=${env}`);
  }
}
