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

  delete(experiment: Experiment) {
    return this.http.delete(`${this.baseUrl}/experiment/delete.php?id=${experiment.experimentId}`);
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

}
