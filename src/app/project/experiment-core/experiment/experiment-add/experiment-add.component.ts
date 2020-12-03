import { Component, OnInit } from '@angular/core';
import { ExperimentService } from '../service/experiment.service';
import { Experiment } from '../model/experiment';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-experiment-add',
  templateUrl: './experiment-add.component.html',
  styleUrls: ['./experiment-add.component.css']
})
export class ExperimentAddComponent implements OnInit {

  POSIX: any = Date.now().toString().substring(0, 10); // Unix timestamp in milliseconds
  random2: any = this.stringGen(4).toUpperCase();
  id: any = this.random2 + this.POSIX;
  experimentModel = new Experiment(this.id, null, null, null, null, null, null, null, null, null, 'on');

  constructor(
    private experimentService: ExperimentService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  post(id: any) {
    const dateStart: Date = new Date();
    const emailAddress = this.authService.getUsername();

    this.experimentModel.emailAddress = emailAddress;
    this.experimentModel.experimentStartDate = dateStart.toISOString().slice(0, 19).replace('T', ' ');

    const dateEnd: Date = new Date(dateStart.setDate(dateStart.getDate() + 29));

    this.experimentModel.experimentEndDate = dateEnd.toISOString().slice(0, 19).replace('T', ' ');

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
