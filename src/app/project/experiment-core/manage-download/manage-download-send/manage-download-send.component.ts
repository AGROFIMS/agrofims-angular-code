import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SiteFile } from '../../site-file/model/site-file';
import { SiteFileService } from '../../site-file/service/site-file.service';
import { ManageDownloadService } from '../service/manage-download.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-manage-download-send',
  templateUrl: './manage-download-send.component.html',
  styleUrls: ['./manage-download-send.component.css'],
  animations: [
    trigger('load', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(600, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ManageDownloadSendComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private manageDownloadService: ManageDownloadService,
    private siteFileService: SiteFileService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['#', 'fileName', 'createdAt', 'download', 'action'];
  dataSource = new MatTableDataSource();

  lastSiteFileId: string;
  result: any;
  randNumber: string;
  siteFileList: SiteFile[];
  disabledDownload = true;
  disabledSave = true;
  disabledBuild = false;

  outPutMessage: string;
  errorsMessageList: string[] = [];
  fileNameMessage: string;
  colorMessage = 'black';

  newSiteFileId = null;
  messageShow: boolean;

  ngOnInit(): void {
    this.messageShow = false;
    this.getAllSiteFile();
  }

  getAllSiteFile() {

    if (!this.data.expNameValid) {
      this.errorsMessageList.push('Experiment name');
      this.disabledBuild = true;
    }
    if (!this.data.expProNameValid) {
      this.errorsMessageList.push('Experiment project name');
      this.disabledBuild = true;
    }
    if (!this.data.cropSelectionValid) {
      this.errorsMessageList.push('Crop common name(s)');
      this.disabledBuild = true;
    }

    if (!this.data.factorSelectionValid) {
      this.errorsMessageList.push('Factor selection');
      this.disabledBuild = true;
    }
    if (!this.data.levelsSettingValid) {
      this.errorsMessageList.push('Level name(s) in factor(s)');
      this.disabledBuild = true;
    }
    if (!this.data.cropMeasurementValid) {
      this.errorsMessageList.push('Crop measurement(s)');
      this.disabledBuild = true;
    }


    if (this.disabledBuild) {
      this.colorMessage = 'red';
      this.outPutMessage = 'Invalid due to missing required inputs: ' + this.errorsMessageList.join('; ');
    }

    this.siteFileService.getById(this.data.expSiteId).subscribe(
      (_siteFileList: SiteFile[]) => {
        this.siteFileList = _siteFileList;
        this.loadDatasource(_siteFileList);
      }
    );
  }

  loadDatasource(objectList: any[]) {
    this.dataSource = new MatTableDataSource(objectList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buildFile() {
    this.lastSiteFileId = null;
    this.disabledDownload = true;
    this.result = null;
    this.fileNameMessage = null;
    this.outPutMessage = 'Building Fieldbook';
    this.colorMessage = 'black';
    this.disabledSave = true;
    this.randNumber = this.stringGen(6);
    return this.manageDownloadService
      .rSend(
        this.data.param1 + '_' + this.randNumber,
        this.data.param2,
        this.data.param3,
        this.data.param4,
        this.data.param5,
        this.data.param6)
      .subscribe(
        (val_1) => {

          if (val_1['result']) {
            console.log(val_1['result']);

            const siteFile = new SiteFile(
              this.data.expSiteId,
              this.data.param1 + '_' + this.randNumber,
              'RAngular/xlsx/',
              'xlsx',
              (val_1['result']['mob_status_fbapp'][0] === '200' ? false : true).toString(),
              (val_1['result']['mob_status_kdsmart'][0] === '200' ? false : true).toString(),
              (val_1['result']['mob_status_odk'][0] === '200' ? false : true).toString(),
              'off');
            this.siteFileService.post(siteFile).subscribe(
              (val_2) => {
                this.lastSiteFileId = val_2['result'];
                this.disabledDownload = false;
                this.result = val_1['result'];
                this.fileNameMessage = null;
                this.outPutMessage = 'Fieldbook successfully built';
                this.colorMessage = 'green';
                this.disabledSave = false;
              }
            );
          } else {
            this.fileNameMessage = null;
            this.outPutMessage = 'Failure to build the Fieldbook';
            this.colorMessage = 'red';
          }
        }
      );
  }

  downloadFileExcel(siteFileId: string) {
    this.siteFileService.get(siteFileId).subscribe(
      (_siteFileList: SiteFile) => {
        location.href = 'https://con.agrofims.org/RAngular/xlsx/' + _siteFileList.fileName + '.xlsx';
      }
    );
  }

  downloadFileZip(siteFileId: string) {
    this.siteFileService.get(siteFileId).subscribe(
      (_siteFileList: SiteFile) => {
        location.href = 'https://con.agrofims.org/RAngular/fbapp/' + _siteFileList.fileName + '.zip';
      }
    );
  }

  downloadFileKdx(siteFileId: string) {
    this.siteFileService.get(siteFileId).subscribe(
      (_siteFileList: SiteFile) => {
        location.href = 'https://con.agrofims.org/RAngular/kdsmart/' + _siteFileList.fileName + '.kdx';
      }
    );
  }

  downloadFileOdk(siteFileId: string) {
    this.siteFileService.get(siteFileId).subscribe(
      (_siteFileList: SiteFile) => {
        location.href = 'https://con.agrofims.org/RAngular/odk/' + _siteFileList.fileName + '.xml';
      }
    );
  }

  deleteFile(siteFileId: string) {
    this.siteFileService.get(siteFileId).subscribe(
      (_siteFile: SiteFile) => {
        _siteFile.status = 'off';
        this.siteFileService.put(_siteFile).subscribe(
          () => {
            this.getAllSiteFile();
          }
        );
      }
    );
  }

  saveFile() {
    this.siteFileService.get(this.lastSiteFileId).subscribe(
      (_siteFile: SiteFile) => {
        _siteFile.status = 'on';
        this.siteFileService.put(_siteFile).subscribe(
          () => {
            this.newSiteFileId = _siteFile.siteFileId;
            this.fileNameMessage = '[' + _siteFile.fileName + ']';
            this.outPutMessage = 'Fieldbook successfully saved';
            this.colorMessage = 'green';
            this.disabledSave = true;
            this.getAllSiteFile();
            this.newMessage();
          }
        );
      }
    );
  }

  stringGen(len: any) {
    let text = '';
    const charset = '123456789';
    for (let i = 0; i < len; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
  }

  newMessage() {
    this.messageShow = true;
    setTimeout(() => {
      this.messageShow = false;
      this.newSiteFileId = null;
    }, 5000);
  }

  help() {
    window.open("https://agrofims.github.io/helpdocs/collect/", "_blank");
  }
}

