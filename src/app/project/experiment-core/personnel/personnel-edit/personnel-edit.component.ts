import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PersonnelService } from '../service/personnel.service';
import { Personnel } from '../model/personnel';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { PersonnelListComponent } from '../personnel-list/personnel-list.component';
// import { AuthService } from '../../../auth/services/auth.service';
// import { RespProfile } from '../../../auth/models/resp';

@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrls: ['./personnel-edit.component.css']
})
export class PersonnelEditComponent implements OnInit, OnChanges {
  @Input() index: any;

  @Input() item: {
    personnel: Personnel,
    ppAffiliationValue: string,
    ppAffiliationCgiar: string,
    fromProfile: string,
  };

  @Input() parameter: {
    parameterId: string
    name: string
  }[];
  @Input() parameter2: {
    parameterId: string
    name: string
  }[];
  @Input() parameter3: {
    parameterId: string
    name: string
  }[];

  constructor(
    private personnelService: PersonnelService,
    private compPersonnelList: PersonnelListComponent,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {

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
      .put(this.item.personnel)
      .subscribe();
  }

  cleanPersonType() {
    this.item.personnel.personTypeOther = null;
    this.put();
  }

  cleanPersonAffiliation() {
    this.item.personnel.personAffiliationCenterId = null;
    this.item.personnel.personAffiliationName = null;
    this.item.personnel.personAffiliationNameOther = null;
    this.put();
  }

  refresh() {
    const personAffiliationId = this.item.personnel.personAffiliationId;

    this.item.personnel.personAffiliationId = '137';


    console.log(this.item.personnel.personAffiliationId);
    console.log(personAffiliationId);

    // console.log(155);
    // console.log('155');

    this.item.personnel.personAffiliationId = personAffiliationId;

  }

}
