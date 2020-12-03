import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { environment } from '../../../../environments/environment';

import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // SERVER_URL = 'https://file.io/';
  baseUrlAuth = environment.baseUrlAuth;
  constructor(private http: HttpClient) { }


  public upload(formData: any) {
    return this.http.post<any>(`${this.baseUrlAuth}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
