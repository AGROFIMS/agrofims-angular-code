import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageDownloadService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  rSend(param1: any, param2: any, param3: any, param4: any, param5: any, param6: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}/r-connection/rSend.php?param1=${param1}&param2=${param2}&param3=${param3}&param4=${param4}&param5=${param5}&param6=${param6}`);
  }

  rCropFertilizer(param1: any, param2: any, param3: any, param4: any, param5: any, param6: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}/r-connection/rCropFertilizer.php?param1=${param1}&param2=${param2}&param3=${param3}&param4=${param4}&param5=${param5}&param6=${param6}`);
  }

  rFactorFertilizer(param1: any, param2: any, param3: any, param4: any, param5: any) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}/r-connection/rFactorFertilizer.php?param1=${param1}&param2=${param2}&param3=${param3}&param4=${param4}&param5=${param5}`);
  }

}
