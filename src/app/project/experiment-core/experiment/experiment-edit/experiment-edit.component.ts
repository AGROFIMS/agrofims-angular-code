import { Component, OnInit, Input } from '@angular/core';
import { ExperimentService } from '../../experiment/service/experiment.service';
import { Experiment } from '../../experiment/model/experiment';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-experiment-edit',
  templateUrl: './experiment-edit.component.html',
  styleUrls: ['./experiment-edit.component.css']
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

  constructor(private experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.get();
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
          this.experiment = _experiment;
        }
      );
  }

  put() {
    this.experiment.experimentType = this.itemsSelected
      .join('|');

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

}
