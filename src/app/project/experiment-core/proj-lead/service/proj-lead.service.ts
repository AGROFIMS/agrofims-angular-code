import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ProjLead } from '../model/proj-lead';

@Injectable({
  providedIn: 'root'
})
export class ProjLeadService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/proj-lead/getAll.php`);
  }

  post(fa: ProjLead) {
    return this.http.post(`${this.baseUrl}/proj-lead/post.php`, fa);
  }

  delete(fa: ProjLead) {
    return this.http.delete(`${this.baseUrl}/proj-lead/delete.php?id=${fa.projLeadId}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/proj-lead/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/proj-lead/getByExp.php?id=${id}`);
  }

  put(fa: ProjLead) {
    return this.http.put(`${this.baseUrl}/proj-lead/put.php`, fa);
  }

}
