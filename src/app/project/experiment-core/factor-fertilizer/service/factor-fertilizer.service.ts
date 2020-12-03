import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FactorFertilizer } from '../model/factor-fertilizer';

@Injectable({
  providedIn: 'root'
})
export class FactorFertilizerService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/factor-fertilizer/getAll.php`);
  }

  post(factorFertilizer: FactorFertilizer) {
    return this.http.post(`${this.baseUrl}/factor-fertilizer/post.php`, factorFertilizer);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/factor-fertilizer/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/factor-fertilizer/get.php?id=${id}`);
  }

  put(factorFertilizer: FactorFertilizer) {
    return this.http.put(`${this.baseUrl}/factor-fertilizer/put.php`, factorFertilizer);
  }

  getById(siteFactorId: string | number) {
    return this.http.get(`${this.baseUrl}/factor-fertilizer/getById.php?siteFactorId=${siteFactorId}`);
  }
}
