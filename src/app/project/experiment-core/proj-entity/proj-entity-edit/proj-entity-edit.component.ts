import { Component, OnInit, Input } from '@angular/core';
import { ProjEntityService } from '../service/proj-entity.service';
import { ProjEntity } from '../model/proj-entity';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { ProjEntityListComponent } from '../proj-entity-list/proj-entity-list.component';

@Component({
  selector: 'app-proj-entity-edit',
  templateUrl: './proj-entity-edit.component.html',
  styleUrls: ['./proj-entity-edit.component.css']
})
export class ProjEntityEditComponent implements OnInit {
  @Input() id: any;
  @Input() index: any;
  projEntity: ProjEntity = new ProjEntity('', '', '', '', '', '', 'on');
  parameter: Parameter[] = [];
  parameter2: Parameter[] = [];
  parameter3: Parameter[] = [];
  constructor(
    private projEntityService: ProjEntityService,
    private compProjEntityList: ProjEntityListComponent,
    private parameterService: ParameterService
  ) { }

  ngOnInit(): void {
    this.get(this.id);
    this.getParameterAll();
    this.getParameterAll2();
    this.getParameterAll3();
  }

  get(id: string) {
    return this.projEntityService
      .get(id)
      .subscribe(
        (projEntity: ProjEntity) => {
          this.projEntity = projEntity;
        });
  }

  remove(projEntity: ProjEntity): void {
    this.projEntityService
      .delete(projEntity)
      .subscribe(() => {
        this.compProjEntityList.remove(this.index);
      });
  }

  put() {
    this.projEntityService
      .put(this.projEntity)
      .subscribe();
  }

  cleanProjEntityOrg() {
    this.projEntity.projEntityCenterId = null;
    this.projEntity.projEntityCrpId = null;
    this.projEntity.projEntityName = null;
    this.projEntity.projEntityOther = null;
    this.put();
  }

  getParameterAll() {
    return this.parameterService
      .getAll('projEntity', 'org')
      .subscribe((parameter: Parameter[]) => this.parameter = parameter);
  }

  getParameterAll2() {
    return this.parameterService
      .getAll('projEntity', 'cgiar_center')
      .subscribe((parameter2: Parameter[]) => this.parameter2 = parameter2);
  }

  getParameterAll3() {
    return this.parameterService
      .getAll('projEntity', 'cgiar_rp')
      .subscribe((parameter3: Parameter[]) => this.parameter3 = parameter3);
  }
}
