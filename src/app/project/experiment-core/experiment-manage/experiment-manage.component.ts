import { Component, OnInit } from '@angular/core';

import { ExperimentService } from '../experiment/service/experiment.service';
import { Experiment } from '../experiment/model/experiment';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-experiment-manage',
  templateUrl: './experiment-manage.component.html',
  styleUrls: ['./experiment-manage.component.css'],
  // providers: [
  //   { provide: 'this.experimentId', useValue: 'experimentId' }
  // ]
})
export class ExperimentManageComponent implements OnInit {
  expId: string;
  experiment: Experiment = new Experiment('', '', '', '', '', '', '', '', '', '', 'on');
  experimentId: any;

  constructor(
    private experimentService: ExperimentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const expId = this.route.snapshot.paramMap.get('id');
    this.expId = expId;
    this.experimentService.getByExp(expId).subscribe(
      (experiment: Experiment) => {
        this.experimentId = experiment.experimentId;
      }
    );
  }
}
