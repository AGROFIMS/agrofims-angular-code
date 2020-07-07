import { ExpSiteService } from '../service/exp-site.service';
import { Component, OnInit, Input } from '@angular/core';
import { ExpSite, ExpSiteFull } from '../model/exp-site';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../site/service/site.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpSiteAddComponent } from '../exp-site-add/exp-site-add.component';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-exp-site-list',
  templateUrl: './exp-site-list.component.html',
  styleUrls: ['./exp-site-list.component.css']
})
export class ExpSiteListComponent implements OnInit {

  @Input() id: any;
  // expSiteList: ExpSite[] = [];
  expSiteFullList: ExpSiteFull[] = [];

  // displayedColumns: string[] = ['expSiteId', 'siteId', 'name', 'action'];

  displayedColumnsI: string[] = [
    '#',
    'countryName',
    'name',
    'modifiedAt',
    'action'
  ];
  ivan: any = '';

  constructor(
    private expSiteService: ExpSiteService,
    // private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.getAll(this.id);

    this.getAllFull(this.id);
  }

  // getAll(id: string) {
  //   return this.expSiteService
  //     .getByExp(id)
  //     .subscribe((_expSiteList: ExpSite[]) => {
  //       this.expSiteList = _expSiteList;
  //       // console.log(this.expSiteList);
  //     });
  // }

  getAllFull(id: any) {
    return this.expSiteService
      .getFull(id)
      .subscribe((_expSiteFullList: ExpSiteFull[]) => {
        this.expSiteFullList = _expSiteFullList;
        // console.log(this.expSiteFullList);
      });
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
    const dialogRef = this.dialog.open(ExpSiteAddComponent, { data: { id: this.id } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (`${result}` === 'true') {

        setTimeout(() => { this.getAllFull(this.id); }, 500);


      }
    });
  }

  // onCreate() {
  //   this.dialog.open(ExpSiteAddComponent);
  // }

}
