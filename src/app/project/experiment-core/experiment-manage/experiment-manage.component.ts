import { Component, OnInit } from '@angular/core';

import { ExperimentService } from '../experiment/service/experiment.service';
import { Experiment } from '../experiment/model/experiment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-experiment-manage',
  templateUrl: './experiment-manage.component.html',
  styleUrls: ['./experiment-manage.component.css']
})
export class ExperimentManageComponent implements OnInit {

  experiment: Experiment = new Experiment('', '', '', '', '', [], '', '', '', '', 'on');

  data: any = 'experimentId';
  s: any;
  w = 'uvan';

  constructor(
    private experimentService: ExperimentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const expId = this.route.snapshot.paramMap.get('id');

    this.experimentService.getByExp(expId).subscribe(
      (experiment: Experiment) => {
        this.experiment = experiment;
        // this.data = experiment['experimentId']
        // const www = data['experimentId'];
        // this.s = experiment[`experimentId`];
        // console.log(experiment);
      }
    );
  }

  // saveSession() {
  //   // this.experimentService.put(this.experiment).subscribe();
  //   alert("ivan");
  // }

}
