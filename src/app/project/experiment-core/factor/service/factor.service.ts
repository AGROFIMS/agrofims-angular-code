import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Factor } from '../model/factor';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class FactorService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // getFactorList(): Observable<Factor[]> {
  //   return this.http.get<Factor[]>(`${this.baseUrl}/factor/getAll.php`);
  // }

  getAll() {
    return this.http.get(`${this.baseUrl}/factor/getAll.php`);
  }

  post(site: Factor) {
    return this.http.post(`${this.baseUrl}/factor/post.php`, site);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/factor/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/factor/get.php?id=${id}`);
  }

  put(site: Factor) {
    return this.http.put(`${this.baseUrl}/factor/put.php`, site);
  }

}
