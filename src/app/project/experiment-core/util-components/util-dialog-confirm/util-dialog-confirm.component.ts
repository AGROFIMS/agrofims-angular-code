import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-util-dialog-confirm',
  templateUrl: './util-dialog-confirm.component.html',
  styleUrls: ['./util-dialog-confirm.component.css']
})
export class UtilDialogConfirmComponent implements OnInit {

  constructor(
    private matDialogReference: MatDialogRef<UtilDialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  message: string;

  ngOnInit(): void {
  }

  confirm(): void {
    this.data.service.get(this.data.id).subscribe(
      (_any: any) => {
        _any.status = 'off';
        this.data.service.put(_any).subscribe(
          () => {
            this.matDialogReference.close([]);
            // this.message = 'Delete Confirmed! ' + this.data.id;
          }
        );
      }
    );
  }

  public closeDialog(): void {
    this.matDialogReference.close([]);
  }

}
