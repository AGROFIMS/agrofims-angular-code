import { Component, OnInit, Input } from '@angular/core';

import { FundAgencyService } from '../service/fund-agency.service';
import { FundAgency } from '../model/fund-agency';

@Component({
  selector: 'app-fund-agency-list',
  templateUrl: './fund-agency-list.component.html',
  styleUrls: ['./fund-agency-list.component.css']
})
export class FundAgencyListComponent implements OnInit {

  @Input() id: any;
  fundAgencyList: FundAgency[] = [];
  fundAgency: any;
  itemList = [];
  fa: FundAgency = new FundAgency('', '', '', '', '', 'on');
  data: any;
  public dataArray = [];
  faModel: any;

  constructor(
    private fundAgencyService: FundAgencyService
  ) { }

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.fundAgencyService
      .getByExp(id)
      .subscribe((fundAgencyList: FundAgency[]) => this.itemList = fundAgencyList);
  }

  post() {

    this.fundAgency = new FundAgency(this.id, null, null, null, null, 'on');

    this.fundAgencyService
      .post(this.fundAgency)
      .subscribe(
        (fa: FundAgency) => {
          const ivan: any = fa;
          this.faModel = new FundAgency(this.id, null, null, null, null, 'on', ivan['result']);
          this.dataArray.push(this.faModel);
          console.log(this.faModel);
        }
      );



    // this.fundAgency.fundAgencyId = 279;

    // this.itemList
    //   .push(this.fundAgency);

  }

  saveFundAgency() {
    this.fundAgencyService.put(this.faModel).subscribe();
  }
}
