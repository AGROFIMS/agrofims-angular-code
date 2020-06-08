import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FundAgency } from '../model/fund-agency';

@Injectable({
  providedIn: 'root'
})
export class FundAgencyService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/fund-agency/getAll.php`);
  }

  post(fa: FundAgency) {
    return this.http.post(`${this.baseUrl}/fund-agency/post.php`, fa);
  }

  delete(fa: FundAgency) {
    return this.http.delete(`${this.baseUrl}/fund-agency/delete.php?id=${fa.fundAgencyId}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/fund-agency/get.php?id=${id}`);
  }

  getByExp(id: string | number) {
    return this.http.get(`${this.baseUrl}/fund-agency/getByExp.php?id=${id}`);
  }

  put(fa: FundAgency) {
    return this.http.put(`${this.baseUrl}/fund-agency/put.php`, fa);
  }

}

