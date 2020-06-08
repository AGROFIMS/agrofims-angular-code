import { Component, OnInit, Input } from '@angular/core';

import { FundAgencyService } from '../service/fund-agency.service';
import { FundAgency } from '../model/fund-agency';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { FundAgencyListComponent } from '../fund-agency-list/fund-agency-list.component';

@Component({
  selector: 'app-fund-agency-edit',
  templateUrl: './fund-agency-edit.component.html',
  styleUrls: ['./fund-agency-edit.component.css']
})
export class FundAgencyEditComponent implements OnInit {

  @Input() id: any;
  fundAgency: FundAgency = new FundAgency('', '', '', '', '', 'on');
  parameter: Parameter[] = [];
  parameter2: Parameter[] = [];

  constructor(
    private fundAgencyService: FundAgencyService,
    private compFundAgencyList: FundAgencyListComponent,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {

    console.log(this.id);

    this.get(this.id);
    this.getParameterAll();
    this.getParameterAll2();
  }

  get(id: string) {
    return this.fundAgencyService
      .get(id)
      .subscribe((fundAgency: FundAgency) => {
        this.fundAgency = fundAgency;
        // console.log(fundAgency);
      });
  }

  remove(fundAgency: FundAgency): void {
    this.fundAgencyService
      .delete(fundAgency)
      .subscribe(() => {
        // console.log(fundAgency.experimentId);
        this.compFundAgencyList.getAll(fundAgency.experimentId);
      });
  }

  save() {
    this.fundAgencyService
      .put(this.fundAgency)
      .subscribe();
  }

  getParameterAll() {
    return this.parameterService
      .getAll('fundAgency', 'type')
      .subscribe((parameter: Parameter[]) => this.parameter = parameter);
  }

  getParameterAll2() {
    return this.parameterService
      .getAll('fundAgency', 'cgiar_type')
      .subscribe((parameter2: Parameter[]) => this.parameter2 = parameter2);
  }
}
