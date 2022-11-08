import { AuthService } from './../../../auth/services/auth.service';
import { SiteFileService } from './../../../experiment-core/site-file/service/site-file.service';
import { SiteFileListComponent } from './../../../experiment-core/site-file/site-file-list/site-file-list.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UploadService } from '../statistical-analysis-list/upload.service';
import { RespUpload } from './resp';
import { SiteFile } from '../../../experiment-core/site-file/model/site-file';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-statistical-analysis-list',
  templateUrl: './statistical-analysis-list.component.html',
  styleUrls: ['./statistical-analysis-list.component.css']
})
export class StatisticalAnalysisListComponent implements OnInit {

  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef;

  files = [];

  constructor(
    private uploadService: UploadService,
    private siteFileService: SiteFileService,
    private authService: AuthService,
  ) { }

  param1: string;
  param2: string;
  param3: string;
  param4: string;

  // crd_trt
  crd_trt_list: string[] = [];
  crd_trt_selected: string[] = [];
  crd_trt: string;

  // crd_traits
  crd_traits_list: string[] = [];
  crd_traits_selected: string[] = [];
  crd_traits: string;



  fcrd_factors_list: string[] = [];
  fcrd_traits_list: string[] = [];




  frcbd_block_list: string[] = [];
  frcbd_factors_list: string[] = [];
  frcbd_traits_list: string[] = [];




  rcbd_block_list: string[] = [];
  rcbd_traits_list: string[] = [];
  rcbd_trt_list: string[] = [];




  sp_block_list: string[] = [];
  sp_main_list: string[] = [];
  sp_sub_list: string[] = [];
  sp_traits_list: string[] = [];




  spsp_block_list: string[] = [];
  spsp_main_list: string[] = [];
  spsp_sub_list: string[] = [];
  spsp_subsub_list: string[] = [];
  spsp_traits_list: string[] = [];





  statisticalDesign: number;
  statisticalDesignList: { index: number, name: string }[] = [
    { index: 1, name: 'Completely Randomized Design (CRD)' },
    { index: 2, name: 'Randomized Complete Block Design (RCBD)' },
    { index: 3, name: 'Factorial with CRD' },
    { index: 4, name: 'Factorial with RCBD' },
    { index: 5, name: 'Split Plot Design' },
    { index: 6, name: 'Split-Split Plot Design' }
  ];

  fieldBook: string = null;
  // fieldBookList: string[];
  siteFileList: SiteFile[];





  // outPutMessage: string;
  // colorMessage = 'text-red';




  ngOnInit(): void {
    this.getFielbooksList();
  }

  onClick() {
    this.files = [];
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push(
          {
            data: file,
            inProgress: false,
            progress: 0,
            message: 'File upload init',
            color: 'black'
          }
        );
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
  }

  private uploadFile(file: { data: any, inProgress: boolean, progress: number, message: string, color: string }) {
    const response = new RespUpload();
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    file.message = 'File upload in process...';
    file.color = 'black';

    this.uploadService.upload(formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);


            break;
          case HttpEventType.Response:
            return event.body;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        file.message = 'File upload failed';
        file.color = 'red';

        return of(`${file.data.name} upload failed.`);
      })).subscribe(
        (_response: RespUpload) => {
          if (typeof (_response) === 'object') {
            response.flag = _response.flag;
            response.msg = _response.msg;

            file.message = 'File uploaded successfully: ' + file.data.name;
            file.color = 'green';

            this.sendName(
              // type_service
              '1',
              // kdx_filename - old name
              file.data.name,
              // excel_filename - field book name
              this.fieldBook,
              // dbfilename - new name
              response.msg,
            );
          }
        });
  }

  private getFielbooksList() {
    const username = this.authService.getUsername();
    return this.siteFileService.getByUser(username).subscribe(
      (_siteFileList: SiteFile[]) => {
        this.siteFileList = _siteFileList;
      }
    );

  }

  sendName(param1: any, param2: any, param3: any, param4: any) {

    this.param1 = param1;
    this.param2 = param2;
    this.param3 = param3;
    this.param4 = param4;


    console.log('type_service (old name): ' + param1);
    console.log('kdx_filename (field book name): ' + param2);
    console.log('excel_filename: ' + param3);
    console.log('dbfilename (new name): ' + param4);

    return this.uploadService
      .rStatisticalName(
        param1,
        param2,
        param3,
        param4)
      .subscribe(
        (val) => {
          this.crd_trt_list = val['result']['crd_trt'];
          this.crd_traits_list = val['result']['crd_traits'];

          this.fcrd_factors_list = val['result']['fcrd_factors'];
          this.fcrd_traits_list = val['result']['fcrd_traits'];

          this.frcbd_block_list = val['result']['frcbd_block'];
          this.frcbd_factors_list = val['result']['frcbd_factors'];
          this.frcbd_traits_list = val['result']['frcbd_traits'];

          this.rcbd_block_list = val['result']['rcbd_block'];
          this.rcbd_traits_list = val['result']['rcbd_traits'];
          this.rcbd_trt_list = val['result']['rcbd_trt'];

          this.sp_block_list = val['result']['sp_block'];
          this.sp_main_list = val['result']['sp_main'];
          this.sp_sub_list = val['result']['sp_sub'];
          this.sp_traits_list = val['result']['sp_traits'];

          this.spsp_block_list = val['result']['spsp_block'];
          this.spsp_main_list = val['result']['spsp_main'];
          this.spsp_sub_list = val['result']['spsp_sub'];
          this.spsp_subsub_list = val['result']['spsp_subsub'];
          this.spsp_traits_list = val['result']['spsp_traits'];

        }
      );
  }



  crd_trt_selected_change() {
    this.crd_trt = this.crd_trt_selected.join(',');
  }

  crd_traits_selected_change() {
    this.crd_traits = this.crd_traits_selected.join(',');
  }

  onDownload() {

    console.log(this.param2);
    console.log(this.param3);
    console.log(this.param4);
    console.log(this.crd_trt);
    console.log(this.crd_traits);

    return this.uploadService
      .rStatisticalName(
        '2',
        this.param2,
        this.param3,
        this.param4,
        this.crd_trt,
        this.crd_traits)

      .subscribe(


        (val) => {
          console.log(val);

          window.open('https://con.agrofims.org/RAngular/word/' + this.param4.replace('.zip', '.docx'), '_blank');

        }
      );

  }
}
