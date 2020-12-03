import { Component, OnInit, Input } from '@angular/core';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { StudyVariable } from '../../study-variable/model/study-variable';
import { CropPhenology } from '../model/crop-phenology';
import { CropPhenologyService } from '../service/crop-phenology.service';
import { StudyVariableService } from '../../study-variable/service/study-variable.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-crop-phenology-list',
  templateUrl: './crop-phenology-list.component.html',
  styleUrls: ['./crop-phenology-list.component.css']
})
export class CropPhenologyListComponent implements OnInit {
  // @Input() siteCrop: SiteCrop;

  @Input() siteCropId: string;
  @Input() cropId: string;
  @Input() cropCommonName: string;
  @Input() expSiteId: string;


  itemList: any[] = [];
  item: any;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  measurementList: { index: string, value_1: string, value_2: string }[] = [];

  constructor(
    private cropPhenologyService: CropPhenologyService,
    private studyVariableService: StudyVariableService,
  ) { }

  ngOnInit(): void {
    this.getMeasurementList();
    this.getAll(this.siteCropId);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  getAll(siteCropId: any) {
    return this.cropPhenologyService
      .getById(siteCropId)
      .subscribe(
        (_itemList: CropPhenology[]) => {
          this.itemList = _itemList;
        }
      );
  }

  getMeasurementList() {
    return this.studyVariableService
      .getById('crop_phenology')
      .subscribe(
        (_measurementList: StudyVariable[]) => {
          _measurementList
            .forEach(element => {
              const index = element.studyVariableId;
              const value_1 = element.measurement;
              const value_2 = element.variableUnit;
              const measurement: { index: string, value_1: string, value_2: string } = { index, value_1, value_2 };
              this.measurementList.push(measurement);
            });
          this.myControl.setValue('');
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }

  post() {
    const _parameterMeasured = this.myControl.value;
    if (!this.itemList.find(element => element.measurement === _parameterMeasured.toString())) {
      const _index = this.measurementList.find(element => element.value_1 === _parameterMeasured.toString()).index;
      const _unit = this.measurementList.find(element => element.value_1 === _parameterMeasured.toString()).value_2;
      this.item = new CropPhenology(
        this.siteCropId,
        this.expSiteId,
        _index,
        this.cropId,
        null, _unit,
        'on', null, _parameterMeasured
      );
      this.cropPhenologyService.post(this.item)
        .subscribe(
          (val) => {
            this.item.cropPhenologyId = val['result'];
            this.itemList.push(this.item);
            this.myControl.setValue('');
          }
        );
    } else {
      this.myControl.setValue('');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.measurementList.forEach(element => {
      optionList.push(element.value_1);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }


  findElement(option: any): boolean {
    if (this.itemList.find(element => element.measurement === option)) {
      return true;
    } else {
      return false;
    }
  }

}
