import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Parameter } from '../../../experiment-core/parameter/model/parameter';
import { ParameterService } from '../../../experiment-core/parameter/service/parameter.service';
import { RespProfile } from '../../models/resp';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private parameterService: ParameterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  profile = new RespProfile();

  // parameterAffiliation: Parameter[] = [];
  // parameterCgiarCenter: Parameter[] = [];

  affiliationName: string;
  affiliationCenter: string;

  ngOnInit(): void {
    // this.getAffiliationList();
    // this.getCgiarCenterList();

    this.get(this.data.input);
  }

  get(_username: string) {
    return this.authService.profile({ username: _username })
      .subscribe(
        (_profile: RespProfile) => {
          if (_profile.affiliationId) { this.getAffiliation(_profile.affiliationId); }
          if (_profile.affiliationCenterId) { this.getCgiarCenter(_profile.affiliationCenterId); }
          this.profile = _profile;
        }
      );
  }

  getAffiliation(affiliationId: string) {
    return this.parameterService
      .getAll('personnel', 'affiliation')
      .subscribe(
        (_parameterAffiliation: Parameter[]) => {
          this.affiliationName = _parameterAffiliation.find(obj => obj.parameterId.toString() == affiliationId).name;
        }

      );
  }

  getCgiarCenter(affiliationCenterId: string) {
    return this.parameterService
      .getAll('personnel', 'cgiar_center')
      .subscribe(
        (_parameterCgiarCenter: Parameter[]) => {
          this.affiliationCenter = _parameterCgiarCenter.find(obj => obj.parameterId.toString() == affiliationCenterId).name;
        }
      );
  }

  // getAffiliationList() {
  //   return this.parameterService
  //     .getAll('personnel', 'affiliation')
  //     .subscribe((_parameterAffiliation: Parameter[]) => this.parameterAffiliation = _parameterAffiliation);
  // }

  // getCgiarCenterList() {
  //   return this.parameterService
  //     .getAll('personnel', 'cgiar_center')
  //     .subscribe((_parameterCgiarCenter: Parameter[]) => this.parameterCgiarCenter = _parameterCgiarCenter);
  // }
}
