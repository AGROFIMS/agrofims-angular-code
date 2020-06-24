import { Component, OnInit, Input } from '@angular/core';
import { ProjLeadService } from '../service/proj-lead.service';
import { ProjLead } from '../model/proj-lead';
@Component({
  selector: 'app-proj-lead-list',
  templateUrl: './proj-lead-list.component.html',
  styleUrls: ['./proj-lead-list.component.css']
})
export class ProjLeadListComponent implements OnInit {
  @Input() id: any;
  itemList: ProjLead[] = [];
  item: any;
  constructor(
    private projLeadService: ProjLeadService
  ) { }

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.projLeadService
      .getByExp(id)
      .subscribe(
        (_projLeadList: ProjLead[]) => {
          this.itemList = _projLeadList;
        }
      );
  }

  post() {
    this.item = new ProjLead(this.id, null, null, null, null, null, 'on');
    this.projLeadService.post(this.item)
      .subscribe(
        (val) => {
          this.item.projLeadId = val['result'];
          this.itemList.push(this.item);
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }

}
