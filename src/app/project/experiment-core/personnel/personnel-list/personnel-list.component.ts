import { Component, OnInit, Input } from '@angular/core';
import { PersonnelService } from '../service/personnel.service';
import { Personnel } from '../model/personnel';
@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css']
})
export class PersonnelListComponent implements OnInit {
  @Input() id: any;
  itemList: Personnel[] = [];
  item: any;
  constructor(
    private personnelService: PersonnelService
  ) { }

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.personnelService
      .getByExp(id)
      .subscribe(
        (_personnelList: Personnel[]) => {
          this.itemList = _personnelList;
        }
      );
  }

  post() {
    this.item = new Personnel(this.id, null, null, null, null, null, null, null, null, null, null, 'on');
    this.personnelService.post(this.item)
      .subscribe(
        (val) => {
          this.item.personId = val['result'];
          console.log(val);
          this.itemList.push(this.item);
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }
}
