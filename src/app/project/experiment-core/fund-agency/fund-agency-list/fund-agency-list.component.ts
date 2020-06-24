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
  itemList: FundAgency[] = [];
  item: any;
  constructor(
    private fundAgencyService: FundAgencyService
  ) { }

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.fundAgencyService
      .getByExp(id)
      .subscribe(
        (_fundAgencyList: FundAgency[]) => {
          this.itemList = _fundAgencyList;
        }
      );
  }

  post() {
    this.item = new FundAgency(this.id, null, null, null, null, 'on');
    this.fundAgencyService.post(this.item)
      .subscribe(
        (val) => {
          this.item.fundAgencyId = val['result'];
          this.itemList.push(this.item);
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }
}
