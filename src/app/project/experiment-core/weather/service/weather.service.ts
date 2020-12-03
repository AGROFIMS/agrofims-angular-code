import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Weather } from '../model/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.baseUrl}/weather/getAll.php`);
  }

  post(weather: Weather) {
    return this.http.post(`${this.baseUrl}/weather/post.php`, weather);
  }

  delete(id: string | number) {
    return this.http.delete(`${this.baseUrl}/weather/delete.php?id=${id}`);
  }

  get(id: string | number) {
    return this.http.get(`${this.baseUrl}/weather/get.php?id=${id}`);
  }

  put(weather: Weather) {
    return this.http.put(`${this.baseUrl}/weather/put.php`, weather);
  }

  getById(id: string | number) {
    return this.http.get(`${this.baseUrl}/weather/getById.php?id=${id}`);
  }
}
