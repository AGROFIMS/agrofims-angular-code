import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { StudyVariable } from '../model/study-variable';
@Injectable({
  providedIn: 'root'
})
export class StudyVariableService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/study-variable/getAll.php`);
  }

  post(studyVariable: StudyVariable) {
    return this.http.post(`${this.baseUrl}/study-variable/post.php`, studyVariable);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/study-variable/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/study-variable/get.php?id=${id}`);
  }

  put(studyVariable: StudyVariable) {
    return this.http.put(`${this.baseUrl}/study-variable/put.php`, studyVariable);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/study-variable/getById.php?id=${id}`);
  }
}
