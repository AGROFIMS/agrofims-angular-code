import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-download',
  templateUrl: './manage-download.component.html',
  styleUrls: ['./manage-download.component.css']
})
export class ManageDownloadComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  rConnection() { }


}
