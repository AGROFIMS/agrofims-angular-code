import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Personnel } from '../model/personnel';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/personnel/getAll.php`);
  }

  post(fa: Personnel) {
    return this.http.post(`${this.baseUrl}/personnel/post.php`, fa);
  }

  delete(fa: Personnel) {
    return this.http.delete(`${this.baseUrl}/personnel/delete.php?id=${fa.personId}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/personnel/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/personnel/getByExp.php?id=${id}`);
  }

  put(fa: Personnel) {
    return this.http.put(`${this.baseUrl}/personnel/put.php`, fa);
  }

}
