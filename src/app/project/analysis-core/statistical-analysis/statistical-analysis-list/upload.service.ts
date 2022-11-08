import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // baseUrlAuth = environment.baseUrlAuth;
  baseUrlAuth = 'https://dev.agrofims.org/api/auth';
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public upload(formData: any) {
    return this.http.post<any>(`${this.baseUrlAuth}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public rStatisticalName(param1: any, param2: any, param3: any, param4: any, param5: any = null, param6: any = null) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(`${this.baseUrl}/r-connection/rStatisticalName.php?param1=${param1}&param2=${param2}&param3=${param3}&param4=${param4}&param5=${param5}&param6=${param6}`);
  }

}
