import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Soil } from '../model/soil';

@Injectable({
  providedIn: 'root'
})
export class SoilService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/soil/getAll.php`);
  }

  post(soil: Soil) {
    return this.http.post(`${this.baseUrl}/soil/post.php`, soil);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/soil/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/soil/get.php?id=${id}`);
  }

  put(soil: Soil) {
    return this.http.put(`${this.baseUrl}/soil/put.php`, soil);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/soil/getById.php?id=${id}`);
  }
}
