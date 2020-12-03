import { Component, OnInit, Input, NgModule, ViewChild, ElementRef } from '@angular/core';
import { ExperimentService } from '../../experiment/service/experiment.service';
import { Experiment } from '../../experiment/model/experiment';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators } from '@angular/forms';
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

  @Input() experimentId: string;

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





  dateInit = new FormControl();
  dateEnd = new FormControl();


  experimentNameFormControl = new FormControl('', [Validators.required]);
  experimentProjectNameFormControl = new FormControl('', [Validators.required]);
  expandInputError1 = false;
  expandInputError2 = false;

  @ViewChild('experimentName') experimentName: ElementRef;

  constructor(private experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.get(this.experimentId);

    setTimeout(() => {
      this.experimentName.nativeElement.focus();
    }, 1000);
  }

  getErrorMessage1() {
    if (this.experimentNameFormControl.hasError('required')) {
      return 'You must enter a experiment name';
    }
  }

  getErrorMessage2() {
    if (this.experimentProjectNameFormControl.hasError('required')) {
      return 'You must enter a experiment project name';
    }
  }

  blurInput1($event: any) {
    if ($event) {
      if (this.experimentNameFormControl.invalid) {
        this.expandInputError1 = true;
      } else {
        this.expandInputError1 = false;
      }
    }
  }

  blurInput2($event: any) {
    if ($event) {
      if (this.experimentProjectNameFormControl.invalid) {
        this.expandInputError2 = true;
      } else {
        this.expandInputError2 = false;
      }
    }
  }

  get(experimentId: string) {
    return this.experimentService.get(experimentId)
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

          if (_experiment.experimentStartDate) {
            this.dateInit.setValue(new Date(_experiment.experimentStartDate).toISOString());
          }

          if (_experiment.experimentEndDate) {
            this.dateEnd.setValue(new Date(_experiment.experimentEndDate).toISOString());
          }

          this.experimentNameFormControl.setValue(_experiment.experimentName);
          this.experimentProjectNameFormControl.setValue(_experiment.experimentProjectName);
          this.experiment = _experiment;
        }
      );
  }

  put() {
    this.experiment.experimentName = this.experimentNameFormControl.value;
    this.experiment.experimentProjectName = this.experimentProjectNameFormControl.value;
    this.experimentService
      .put(this.experiment)
      .subscribe();
  }

  dateChangeInit() {
    this.experiment.experimentStartDate = this.dateInit.value.toISOString().slice(0, 19).replace('T', ' ');
    this.put();
  }

  dateChangeEnd() {
    this.experiment.experimentEndDate = this.dateEnd.value.toISOString().slice(0, 19).replace('T', ' ');
    this.put();
  }

  experimentTypeClear() {
    if (!this.itemsSelected.includes('Other')) {
      this.itemsOtherSelected = [];
      this.experiment.experimentTypeOther = null;
    }
    this.experiment.experimentType = this.itemsSelected.join('|');
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
