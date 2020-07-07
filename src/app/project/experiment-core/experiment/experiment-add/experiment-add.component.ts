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

  POSIX: any = Date.now().toString().substring(0, 10); // Unix timestamp in milliseconds
  // random: string = Math.random().toString(36).substring(9).toUpperCase();
  random2: any = this.stringGen(4).toUpperCase();
  id: any = this.random2 + this.POSIX;
  experimentModel = new Experiment(this.id, null, null, null, null, null, null, null, null, null, 'on');

  constructor(
    private experimentService: ExperimentService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  post(id: any) {
    // this.experimentService.post(this.experimentModel).subscribe();

    this.experimentService.post(this.experimentModel).subscribe(() => {
      this.router.navigate(['/experiments/manage/', id]);
    });
  }

  stringGen(len: any) {
    let text = '';

    const charset = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < len; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return text;
  }
}
