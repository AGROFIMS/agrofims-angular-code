import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
// import { Parameter } from '../model/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll(entity: string, singularity: string) {
    return this.http.get(`${this.baseUrl}/parameter/getAll.php?entity=${entity}&singularity=${singularity}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/parameter/get.php?id=${id}`);
  }

}

