import { Component, OnInit, Input } from '@angular/core';

import { FundAgencyService } from '../service/fund-agency.service';
import { FundAgency } from '../model/fund-agency';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';

@Component({
  selector: 'app-fund-agency-add',
  templateUrl: './fund-agency-add.component.html',
  styleUrls: ['./fund-agency-add.component.css']
})
export class FundAgencyAddComponent implements OnInit {

  @Input() id: any;
  fundAgency: any;
  fa: FundAgency[] = [];
  newRow = [];
  parameter: Parameter[] = [];
  parameter2: Parameter[] = [];

  constructor(
    private fundAgencyService: FundAgencyService,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {
    this.getParameterAll();
    this.getParameterAll2();
  }

  addForm() {
    this.fundAgency = new FundAgency(this.id, null, '', '', null, 'on');
    this.newRow.push(this.fundAgency);
    this.fundAgencyService.post(this.fundAgency).subscribe();
  }

  removeForm(index: number) {
    this.newRow.splice(index, 1);
  }

  saveFundAgency() {

    // console.log(JSON.stringify(this.dataArray));
    for (const index of Object.keys(this.newRow)) {
      this.fundAgencyService.post(this.newRow[index]).subscribe();
    }

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
