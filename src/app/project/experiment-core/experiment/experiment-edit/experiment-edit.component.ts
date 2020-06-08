import { Component, OnInit, Input } from '@angular/core';

import { ExperimentService } from '../../experiment/service/experiment.service';
import { Experiment } from '../../experiment/model/experiment';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-experiment-edit',
  templateUrl: './experiment-edit.component.html',
  styleUrls: ['./experiment-edit.component.css']
})
export class ExperimentEditComponent implements OnInit {

  values = '';

  @Input() id: any;
  experiment: Experiment = new Experiment('', '', '', '', '', [], '', '', '', '', 'on');

  ta: any = [];
  ta2: any = ['multi-location', 'on-farm'];

  ivan: any[] = [
    { name: 'on-farm' },
    { name: 'on-station' },
    { name: 'multi-season' },
    { name: 'one season' },
    { name: 'multi-location' },
    { name: 'one location' },
    { name: 'long-term (10+ years)' },
    { name: 'Other' }
  ];

  // toppings = new FormControl();
  // tslint:disable-next-line: max-line-length
  // toppingList: string[] = ['on-farm', 'on-station', 'multi-season', 'one season', 'multi-location', 'one location', 'long-term (10+ years)', 'Other'];


  date = new FormControl('2019-08-22T23:00:00');

  constructor(
    private experimentService: ExperimentService
  ) { }

  ngOnInit(): void {
    // console.log(this.id);
    this.experimentService.get(this.id).subscribe((experiment: Experiment) => this.experiment = experiment);
  }

  saveExp() {
    // console.log(JSON.stringify(this.experiment));
    this.experimentService.put(this.experiment).subscribe();
  }

  onKey(event: any) {
    this.saveExp();
  }

  onChangeObj(newObj) {
    this.saveExp();
  }

}
