import { Component, OnInit, Input } from '@angular/core';
import { ProjEntityService } from '../service/proj-entity.service';
import { ProjEntity } from '../model/proj-entity';
@Component({
  selector: 'app-proj-entity-list',
  templateUrl: './proj-entity-list.component.html',
  styleUrls: ['./proj-entity-list.component.css']
})
export class ProjEntityListComponent implements OnInit {
  @Input() id: any;
  itemList: ProjEntity[] = [];
  item: any;
  constructor(
    private projEntityService: ProjEntityService
  ) { }

  ngOnInit(): void {
    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.projEntityService
      .getByExp(id)
      .subscribe(
        (_projEntityList: ProjEntity[]) => {
          this.itemList = _projEntityList;
        }
      );
  }

  post() {
    this.item = new ProjEntity(this.id, null, null, null, null, null, 'on');
    this.projEntityService.post(this.item)
      .subscribe(
        (val) => {
          this.item.projEntityId = val['result'];
          this.itemList.push(this.item);
        }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }
}


