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
  @Input() index: any;
  fundAgency: FundAgency = new FundAgency('', '', '', '', '', 'on');
  parameter: Parameter[] = [];
  parameter2: Parameter[] = [];
  constructor(
    private fundAgencyService: FundAgencyService,
    private compFundAgencyList: FundAgencyListComponent,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {
    this.get(this.id);
    this.getParameterAll();
    this.getParameterAll2();
  }

  get(id: string) {
    return this.fundAgencyService
      .get(id)
      .subscribe(
        (_fundAgency: FundAgency) => {
          this.fundAgency = _fundAgency;
        });
  }

  remove(fundAgency: FundAgency): void {
    this.fundAgencyService
      .delete(fundAgency)
      .subscribe(() => {
        this.compFundAgencyList.remove(this.index);
      });
  }

  put() {
    this.fundAgencyService
      .put(this.fundAgency)
      .subscribe();
  }

  cleanFundAgencyType() {
    this.fundAgency.fundAgencyTypeName = null;
    this.fundAgency.fundAgencyTypeOther = null;
    this.fundAgency.fundAgencyTypeCenterId = null;
    this.put();
  }

  getParameterAll() {
    return this.parameterService
      .getAll('fundAgency', 'type')
      .subscribe((_parameter: Parameter[]) => this.parameter = _parameter);
  }

  getParameterAll2() {
    return this.parameterService
      .getAll('fundAgency', 'cgiar_type')
      .subscribe((_parameter2: Parameter[]) => this.parameter2 = _parameter2);
  }
}
