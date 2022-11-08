import { ExpSiteService } from '../service/exp-site.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExpSite, ExpSiteFull } from '../model/exp-site';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../site/service/site.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpSiteAddComponent } from '../exp-site-add/exp-site-add.component';
import { delay } from 'rxjs/operators';


import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilDialogConfirmComponent } from '../../util-components/util-dialog-confirm/util-dialog-confirm.component';

@Component({
  selector: 'app-exp-site-list',
  templateUrl: './exp-site-list.component.html',
  styleUrls: ['./exp-site-list.component.css']
})
export class ExpSiteListComponent implements OnInit {

  @Input() id: any;
  @Input() dateYearMonth: string;
  @Input() emailAddress: string;

  constructor(
    private expSiteService: ExpSiteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['#', 'countryName', 'name', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();
  expSiteFullList: ExpSiteFull[] = [];

  ngOnInit(): void {
    this.getAllFull(this.id);
  }

  help() {
    window.open("https://agrofims.github.io/helpdocs/creatingafieldbook/fieldbook/", "_blank");
  }

  getAllFull(id: any) {
    return this.expSiteService
      .getFull(id)
      .subscribe((_expSiteFullList: ExpSiteFull[]) => {
        this.loadDatasource(_expSiteFullList.filter(obj1 => obj1.status === 'on'));
        this.expSiteFullList = _expSiteFullList.filter(obj1 => obj1.status === 'on');
      });
  }

  loadDatasource(objectList: any[]) {
    this.dataSource = new MatTableDataSource(objectList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editExpSite(id: any) {
    const expId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/experiments/manage', expId, 'site', id]);
  }

  deleteExpSite(id: any) {
    this.expSiteService
      .delete(id)
      .subscribe(() => {
        this.getAllFull(this.id);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ExpSiteAddComponent, {
      //  width: '250px',
      data: {
        id: this.id,
        dateYearMonth: this.dateYearMonth,
        emailAddress: this.emailAddress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (`${result}` === 'true') {
        setTimeout(() => { this.getAllFull(this.id); }, 500);
      }
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  popup(id: string) {
    const dialogRef = this.dialog.open(UtilDialogConfirmComponent, {
      data:
      {
        id: id,
        service: this.expSiteService,
      },
      width: '25%',
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => { this.getAllFull(this.id); }, 500);
    });
  }

}
