import { Component, OnInit, Input } from '@angular/core';

import { ExpSiteService } from '../service/exp-site.service';
import { ExpSite } from '../model/exp-site';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from '../../site/service/site.service';
import { Site } from '../../site/model/site';
import { MatDialog } from '@angular/material/dialog';
import { ExpSiteAddComponent } from '../exp-site-add/exp-site-add.component';

@Component({
  selector: 'app-exp-site-list',
  templateUrl: './exp-site-list.component.html',
  styleUrls: ['./exp-site-list.component.css']
})
export class ExpSiteListComponent implements OnInit {

  @Input() id: any;
  expSite: ExpSite[] = [];
  displayedColumns: string[] = ['expSiteId', 'siteId', 'name', 'action'];

  site: Site[] = [];

  constructor(
    private expSiteService: ExpSiteService,
    private siteService: SiteService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.expSiteService
      .getByExp(id)
      .subscribe((expSite: ExpSite[]) => {
        this.expSite = expSite;
      });
  }

  editExpSite(id: any) {
    const expId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/experiments/manage', expId, 'site', id]);
  }

  deleteExpSite(expSite: ExpSite) {
    this.expSiteService
      .delete(expSite)
      .subscribe(() => {
        this.getAll(this.id);
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ExpSiteAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);

      if (`${result}` === 'true') {
        console.log('si');
        this.getAll(this.id);
      }

    });

  }

}
