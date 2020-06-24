import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource } from './data-table-datasource';
import { ExpSite, ExpSiteFull } from '../model/exp-site';

import { ExpSiteService } from '../service/exp-site.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<ExpSite>;
  dataSource: DataTableDataSource;

  displayedColumns = [
    'expSiteId',
    'experimentId',
    'siteId',
    'inHighLevelId',
    'inHighLevelOther',
    'inSiteVegetation',
    'inSiteVegetationOther',
    'inSiteDescNotes',
    // 'soilClassSystemId',
    // 'soilClassGroupId',
    // 'soilClassSystemOther',
    'status',
    'action'
  ];
  expSiteFullList: ExpSiteFull[] = [];
  expSiteList: ExpSite[] = [];

  constructor(
    private expSiteService: ExpSiteService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.dataSource = new DataTableDataSource();
    this.getAll('36');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getAll(id: string) {
    return this.expSiteService
      .getByExp(id)
      .subscribe((_expSiteList: ExpSite[]) => {
        this.expSiteList = _expSiteList;
        this.dataSource.data = _expSiteList;
      });
  }

  getAllFull(id: string) {
    return this.expSiteService
      .getFull(id)
      .subscribe((_expSiteFullList: ExpSiteFull[]) => {
        this.expSiteFullList = _expSiteFullList;
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
        this.getAll('36');
      });
  }
}
