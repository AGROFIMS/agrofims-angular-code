import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ExperimentService } from '../service/experiment.service';
import { Experiment } from '../model/experiment';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExperimentAddComponent } from '../experiment-add/experiment-add.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UtilDialogConfirmComponent } from '../../util-components/util-dialog-confirm/util-dialog-confirm.component';
import { AuthService } from '../../../auth/services/auth.service';

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
    private authService: AuthService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['#', 'expId', 'experimentName', 'experimentProjectName', 'createdAt', 'action'];
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.getExperiments();
  }

  getExperiments() {
    return this.experimentService
      .getAll()
      .subscribe((_experimentList: Experiment[]) => {
        const username = this.authService.getUsername();
        if (username === 'admin') {
          this.loadDatasource(_experimentList.filter(obj => obj.status === 'on'));
        } else {
          this.loadDatasource(_experimentList.filter(obj => obj.status === 'on' && obj.emailAddress === username));
        }
      });
  }

  loadDatasource(objectList: any[]) {
    this.dataSource = new MatTableDataSource(objectList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addExperiment() {
    const dialogRef = this.dialog.open(ExperimentAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (`${result}` === 'true') {
        setTimeout(() => { this.getExperiments(); }, 1000);
      }
    });
  }

  deleteExperiment(experimentId: any) {
    this.experimentService
      .delete(experimentId)
      .subscribe(() => {
        this.getExperiments();
      });
  }

  editExperiment(id: any) {
    this.router.navigate(['/experiments/manage', id]);
  }

  popup(experimentId: string) {
    const dialogRef = this.dialog.open(UtilDialogConfirmComponent, {
      data:
      {
        id: experimentId,
        service: this.experimentService,
      },
      width: '25%',
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => { this.getExperiments(); }, 500);
    });
  }

}
