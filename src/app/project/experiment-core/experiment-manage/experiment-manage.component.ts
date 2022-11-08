import { Component, OnInit } from '@angular/core';

import { ExperimentService } from '../experiment/service/experiment.service';
import { Experiment } from '../experiment/model/experiment';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-experiment-manage',
  templateUrl: './experiment-manage.component.html',
  styleUrls: ['./experiment-manage.component.css'],
})
export class ExperimentManageComponent implements OnInit {
  experiment: Experiment = new Experiment('', '', '', '', '', '', '', '', '', '', 'on');

  experimentId: string;
  dateYearMonth: string;
  emailAddress: string;

  demo1TabIndex = 0;
  expId: string;

  constructor(
    private experimentService: ExperimentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.expId = this.route.snapshot.paramMap.get('id').toString();
    this.getByExp(this.expId);
  }
  getByExp(expId: string) {
    return this.experimentService.getByExp(expId).subscribe(
      (_experiment: Experiment) => {
        this.experimentId = _experiment.experimentId.toString();
        this.dateYearMonth = _experiment.experimentStartDate.slice(0, 7).replace('-', '');
        this.emailAddress = _experiment.emailAddress;
      }
    );
  }

  next() {
    const tabCount = 3;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
  }

  rConnection() {
    return this.experimentService.rSend(this.experimentId)
      .subscribe(
        (val) => {
          console.log(val);
        }
      );
  }

}
