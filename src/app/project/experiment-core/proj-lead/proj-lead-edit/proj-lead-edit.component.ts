import { Component, OnInit, Input } from '@angular/core';
import { ProjLeadService } from '../service/proj-lead.service';
import { ProjLead } from '../model/proj-lead';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { ProjLeadListComponent } from '../proj-lead-list/proj-lead-list.component';

@Component({
  selector: 'app-proj-lead-edit',
  templateUrl: './proj-lead-edit.component.html',
  styleUrls: ['./proj-lead-edit.component.css']
})
export class ProjLeadEditComponent implements OnInit {
  @Input() id: any;
  @Input() index: any;
  projLead: ProjLead = new ProjLead('', '', '', '', '', '', 'on');
  parameter: Parameter[] = [];
  parameter2: Parameter[] = [];
  parameter3: Parameter[] = [];
  constructor(
    private projLeadService: ProjLeadService,
    private compProjLeadList: ProjLeadListComponent,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {
    this.get(this.id);
    this.getParameterAll();
    this.getParameterAll2();
    this.getParameterAll3();
  }


  get(id: string) {
    return this.projLeadService
      .get(id)
      .subscribe(
        (_projLead: ProjLead) => {
          this.projLead = _projLead;
        });
  }

  remove(projLead: ProjLead): void {
    this.projLeadService
      .delete(projLead)
      .subscribe(() => {
        this.compProjLeadList.remove(this.index);
      });
  }

  put() {
    this.projLeadService
      .put(this.projLead)
      .subscribe();
  }

  cleanProjLeadOrg() {
    this.projLead.projLeadCenterId = null;
    this.projLead.projLeadCRPId = null;
    this.projLead.projLeadPerson = null;
    this.projLead.projLeadOther = null;
    this.put();
  }

  getParameterAll() {
    return this.parameterService
      .getAll('projLead', 'org')
      .subscribe((parameter: Parameter[]) => this.parameter = parameter);
  }

  getParameterAll2() {
    return this.parameterService
      .getAll('projLead', 'cgiar_center')
      .subscribe((parameter2: Parameter[]) => this.parameter2 = parameter2);
  }

  getParameterAll3() {
    return this.parameterService
      .getAll('projLead', 'cgiar_rp')
      .subscribe((parameter3: Parameter[]) => this.parameter3 = parameter3);
  }
}
