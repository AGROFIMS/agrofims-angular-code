import { Component, OnInit, Input } from '@angular/core';
import { ExpSite } from '../../exp-site/model/exp-site';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SoilService } from '../service/soil.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { startWith, map } from 'rxjs/operators';
import { Soil } from '../model/soil';

@Component({
  selector: 'app-soil-list',
  templateUrl: './soil-list.component.html',
  styleUrls: ['./soil-list.component.css']
})
export class SoilListComponent implements OnInit {

  @Input() expSite: ExpSite;
  @Input() soilList: Soil[];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  measurementList: {
    index: string,
    value: string,
    unit: string
  }[] = [];

  constructor(
    private soilService: SoilService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();

    this.getAll(this.expSite.expSiteId);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll(expSiteId: any) {
    return this.soilService
      .getById(expSiteId)
      .subscribe(
        (_itemList: Soil[]) => {
          this.soilList = _itemList;
        }
      );
  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('soil')
      .subscribe(
        (_measurementList: StudyVariable[]) => {
          _measurementList
            .forEach(element => {
              const index = element.studyVariableId;
              const value = element.measurement;
              const unit = element.defaultVariableValue;
              const measurement: { index: string, value: string, unit: string } = { index, value, unit };
              this.measurementList.push(measurement);
            });
          this.myControl.setValue('');
        }
      );
  }

  remove(index: number) {
    this.soilList.splice(index, 1);
  }

  post() {
    const _value = this.myControl.value;
    const _index = this.measurementList.find(element => element.value === _value.toString()).index;
    const _unit = this.measurementList.find(element => element.value === _value.toString()).unit;

    const _soil = new Soil(
      this.expSite.expSiteId,
      _index, null, _unit, null, null, '1', '1', null, null, null, null, null, null, 'on', null, _value);

    this.soilService.post(_soil)
      .subscribe(
        (val) => {
          _soil.soilId = val['result'];
          this.soilList.push(_soil);
          this.myControl.setValue('');
        }
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.measurementList.forEach(element => {
      optionList.push(element.value);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }

  findElement(option: any): boolean {
    // if (this.soilList.find(element => element.measurement === option)) {
    //   return true;
    // } else {
    return false;
    // }
  }
}
