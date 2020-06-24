import { Component, OnInit, ViewChild } from '@angular/core';
import { ExperimentService } from '../service/experiment.service';
import { Experiment } from '../model/experiment';
import { Router } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ExperimentListDataSource } from './experiment-list-datasource';
import { ExperimentAddComponent } from '../experiment-add/experiment-add.component';


@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})

export class ExperimentListComponent implements OnInit {
  constructor(
    private experimentService: ExperimentService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['expId', 'experimentName', 'experimentProjectName', 'modifiedAt', 'action'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {

    this.getExperiments();
  }

  getExperiments() {
    return this.experimentService
      .getAll()
      .subscribe((_experimentList: Experiment[]) => {
        this.dataSource = new MatTableDataSource(_experimentList);
        this.dataSource.sort = this.sort;
      })
      ;
  }

  addExperiment() {
    const dialogRef = this.dialog.open(ExperimentAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (`${result}` === 'true') {

        setTimeout(() => { this.getExperiments(); }, 1000);
      }
    });
    // this.router.navigate(['/experiments/add']);
  }

  // getAllFull(id: any) {
  //   return this.expSiteService
  //     .getFull(id)
  //     .subscribe((_expSiteFullList: ExpSiteFull[]) => {
  //       this.expSiteFullList = _expSiteFullList;
  //       // console.log(this.expSiteFullList);
  //     });
  // }

  deleteExperiment(experiment: Experiment) {
    this.experimentService
      .delete(experiment)
      .subscribe(() => {
        this.getExperiments();
      });
  }

  editExperiment(id: any) {
    this.router.navigate(['/experiments/manage', id]);
  }





}
