import { Component, OnInit, Input } from '@angular/core';
import { PersonnelService } from '../service/personnel.service';
import { Personnel } from '../model/personnel';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { PersonnelListComponent } from '../personnel-list/personnel-list.component';
@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrls: ['./personnel-edit.component.css']
})
export class PersonnelEditComponent implements OnInit {
  @Input() id: any;
  @Input() index: any;
  personnel: Personnel = new Personnel('', '', '', '', '', '', '', '', '', '', '', 'on');
  parameter: Parameter[] = [];
  parameter2: Parameter[] = [];
  parameter3: Parameter[] = [];
  constructor(
    private personnelService: PersonnelService,
    private compPersonnelList: PersonnelListComponent,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {
    this.get(this.id);
    this.getParameterAll();
    this.getParameterAll2();
    this.getParameterAll3();
  }

  get(id: string) {
    return this.personnelService
      .get(id)
      .subscribe(
        (_personnel: Personnel) => {
          this.personnel = _personnel;
        });
  }

  remove(personnel: Personnel): void {
    this.personnelService
      .delete(personnel)
      .subscribe(() => {
        this.compPersonnelList.remove(this.index);
      });
  }

  put() {
    this.personnelService
      .put(this.personnel)
      .subscribe();
  }

  cleanPersonType() {
    this.personnel.personTypeOther = null;
    this.put();
  }

  cleanPersonAffiliation() {
    this.personnel.personAffiliationCenterId = null;
    this.personnel.personAffiliationName = null;
    this.personnel.personAffiliationNameOther = null;
    this.put();
  }

  getParameterAll() {
    return this.parameterService
      .getAll('personnel', 'type')
      .subscribe((_parameter: Parameter[]) => this.parameter = _parameter);
  }

  getParameterAll2() {
    return this.parameterService
      .getAll('personnel', 'affiliation')
      .subscribe((_parameter2: Parameter[]) => this.parameter2 = _parameter2);
  }

  getParameterAll3() {
    return this.parameterService
      .getAll('personnel', 'cgiar_center')
      .subscribe((_parameter3: Parameter[]) => this.parameter3 = _parameter3);
  }

}
