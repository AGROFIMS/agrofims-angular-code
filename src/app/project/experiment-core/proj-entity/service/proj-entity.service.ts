import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ProjEntity } from '../model/proj-entity';

@Injectable({
  providedIn: 'root'
})
export class ProjEntityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/proj-entity/getAll.php`);
  }

  post(fa: ProjEntity) {
    return this.http.post(`${this.baseUrl}/proj-entity/post.php`, fa);
  }

  delete(fa: ProjEntity) {
    return this.http.delete(`${this.baseUrl}/proj-entity/delete.php?id=${fa.projEntityId}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/proj-entity/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/proj-entity/getByExp.php?id=${id}`);
  }

  put(fa: ProjEntity) {
    return this.http.put(`${this.baseUrl}/proj-entity/put.php`, fa);
  }

}
