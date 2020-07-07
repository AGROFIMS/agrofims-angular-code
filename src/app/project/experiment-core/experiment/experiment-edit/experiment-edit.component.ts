import { Component, OnInit, Input, NgModule, ViewChild, ElementRef } from '@angular/core';
import { ExperimentService } from '../../experiment/service/experiment.service';
import { Experiment } from '../../experiment/model/experiment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { isNull } from 'util';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@Component({
  selector: 'app-experiment-edit',
  templateUrl: './experiment-edit.component.html',
  styleUrls: ['./experiment-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})

export class ExperimentEditComponent implements OnInit {

  @Input() id: any;
  items: string[] = ['on-farm',
    'on-station',
    'multi-season',
    'one season',
    'multi-location',
    'one location',
    'long-term (10+ years)',
    'Other'
  ];

  experiment: Experiment = new Experiment('', '', '', '', '', '', '', '', '', '', 'on');

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsOtherSelected: string[] = [];
  itemsSelected: string[] = [];

  date: Date = new Date();
  dateInit = new FormControl(this.date.toISOString());
  dateEnd = new FormControl(this.date.toISOString());

  @ViewChild('experimentName') experimentName: ElementRef;

  constructor(private experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.get();

    setTimeout(() => {
      this.experimentName.nativeElement.focus();
    }, 1000);
  }

  get() {
    return this.experimentService.get(this.id)
      .subscribe(
        (_experiment: Experiment) => {
          try {
            this.itemsSelected = _experiment.experimentType.split('|');
          } catch (error) {
          }

          try {
            this.itemsOtherSelected = _experiment.experimentTypeOther.split('|');
          } catch (error) {
          }

          if (!isNull(_experiment.experimentStartDate)) {
            this.dateInit.setValue(new Date(_experiment.experimentStartDate).toISOString());
          }

          if (!isNull(_experiment.experimentEndDate)) {
            this.dateEnd.setValue(new Date(_experiment.experimentEndDate).toISOString());
          } else {
            this.date.setDate(this.date.getDate() + 29);
            this.dateEnd.setValue(new Date(this.date).toISOString());
          }

          this.experiment = _experiment;
        }
      );
  }

  put() {
    this.experiment.experimentType = this.itemsSelected.join('|');
    this.experiment.experimentStartDate = this.dateInit.value.toISOString().slice(0, 19).replace('T', ' ');
    this.experiment.experimentEndDate = this.dateEnd.value.toISOString().slice(0, 19).replace('T', ' ');
    this.experimentService
      .put(this.experiment)
      .subscribe();
  }

  experimentTypeClear() {
    if (!this.itemsSelected.includes('Other')) {
      this.itemsOtherSelected = [];
      this.experiment.experimentTypeOther = null;
    }
    this.put();

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.itemsOtherSelected.indexOf(value);
      if (index < 0) {
        this.itemsOtherSelected.push(value.trim());
        this.experiment.experimentTypeOther = this.itemsOtherSelected.join('|');
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  remove(itemOther: string): void {
    const index = this.itemsOtherSelected.indexOf(itemOther);
    if (index >= 0) {
      this.itemsOtherSelected.splice(index, 1);
      this.experiment.experimentTypeOther = this.itemsOtherSelected.join('|');
      this.put();
    }
  }

  getDate() {
    console.log('dateInit');

    console.log(this.dateInit.value.toISOString());

    console.log('dateEnd');

    console.log(this.dateEnd.value.toISOString());
  }

}
