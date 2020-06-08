import { Component, OnInit } from '@angular/core';

import { ExperimentService } from '../service/experiment.service';
import { Experiment } from '../model/experiment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit {

  experiment: Experiment[] = [];

  displayedColumns: string[] = ['id', 'name', 'projectName', 'experimentType', 'date', 'action'];

  constructor(
    private experimentService: ExperimentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getExperiments();
  }

  getExperiments() {
    return this.experimentService
      .getAll()
      .subscribe((experiment: Experiment[]) => {
        this.experiment = experiment;
        // this.ivan = experiment;
      });
  }

  addExperiment() {
    this.router.navigate(['/experiments/add']);
  }

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
