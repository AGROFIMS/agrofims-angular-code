import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../service/experiment.service';
import { Experiment } from '../model/experiment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiment-add',
  templateUrl: './experiment-add.component.html',
  styleUrls: ['./experiment-add.component.css']
})
export class ExperimentAddComponent implements OnInit {

  random: string = Math.random().toString(36).substring(7).toUpperCase();
  experimentModel = new Experiment(this.random, null, null, null, null, null, null, null, null, null, 'on');

  constructor(
    private experimentService: ExperimentService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  post(id: any) {
    this.experimentService.post(this.experimentModel).subscribe();
  }
}
