import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CropSoil } from '../model/crop-soil';
@Injectable({
  providedIn: 'root'
})
export class CropSoilService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/crop-soil/getAll.php`);
  }

  post(cropSoil: CropSoil) {
    return this.http.post(`${this.baseUrl}/crop-soil/post.php`, cropSoil);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/crop-soil/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-soil/get.php?id=${id}`);
  }

  put(cropSoil: CropSoil) {
    return this.http.put(`${this.baseUrl}/crop-soil/put.php`, cropSoil);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/crop-soil/getById.php?id=${id}`);
  }
}
