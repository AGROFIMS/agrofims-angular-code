import { Component, OnInit, Input } from '@angular/core';
import { PersonnelService } from '../service/personnel.service';
import { Personnel } from '../model/personnel';
import { AuthService } from '../../../auth/services/auth.service';
import { RespProfile } from '../../../auth/models/resp';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.css']
})
export class PersonnelListComponent implements OnInit {
  @Input() id: any;

  itemList: {
    personnel: Personnel,
    ppAffiliationValue: string,
    ppAffiliationCgiar: string,
    fromProfile: string,
  }[] = [];

  // itemList: Personnel[] = [];
  // item: Personnel;

  personnelProfile: Personnel;

  parameter: {
    parameterId: string
    name: string
  }[] = [];
  parameter2: {
    parameterId: string
    name: string
  }[] = [];
  parameter3: {
    parameterId: string
    name: string
  }[] = [];

  constructor(
    private personnelService: PersonnelService,
    private authService: AuthService,
    private parameterService: ParameterService,
  ) { }

  ngOnInit(): void {
    this.getParameterAll();
    this.getParameterAll2();
    this.getParameterAll3();

    this.getAll(this.id);
  }

  getAll(id: string) {
    return this.personnelService
      .getByExp(id)
      .subscribe(
        (_personnelList: Personnel[]) => {

          _personnelList.forEach(_personnel => {

            const item: {
              personnel: Personnel,
              ppAffiliationValue: string,
              ppAffiliationCgiar: string,
              fromProfile: string,
            } = {
              personnel: _personnel,

              ppAffiliationValue: (
                (_personnel.personAffiliationId && this.parameter2.length > 0) ?
                  this.parameter2.find(obj => obj.parameterId.toString() == _personnel.personAffiliationId).name :
                  null
              ),

              ppAffiliationCgiar: (
                (_personnel.personAffiliationCenterId && this.parameter3.length > 0) ?
                  this.parameter3.find(obj => obj.parameterId.toString() == _personnel.personAffiliationCenterId).name :
                  null
              ),

              fromProfile: _personnel.fromProfile ? _personnel.fromProfile : null,
            };

            this.itemList.push(item);
          });

        }
      );
  }

  help() {
    window.open("https://agrofims.github.io/helpdocs/creatingafieldbook/personnel/", "_blank");
  }

  post(personnel: Personnel = null) {

    let _personnel: Personnel;
    let _ppAffiliationValue: string;
    let _ppAffiliationCgiar: string;
    let _fromProfile: string;

    if (personnel) {
      _personnel = personnel;
      _ppAffiliationValue = personnel.personAffiliationId ?
        this.parameter2.find(obj => obj.parameterId.toString() == personnel.personAffiliationId).name : null;
      _ppAffiliationCgiar = personnel.personAffiliationCenterId ?
        this.parameter3.find(obj => obj.parameterId.toString() == personnel.personAffiliationCenterId).name : null;
      _fromProfile = personnel.fromProfile;
    } else {
      _personnel = new Personnel(this.id, null, null, null, null, null, null, null, null, null, null, 'on', null, 'off');
      _ppAffiliationValue = null;
      _ppAffiliationCgiar = null;
      _fromProfile = null;
    }

    this.personnelService.post(_personnel)
      .subscribe(
        (val) => {
          _personnel.personId = val['result'];
          const item: {
            personnel: Personnel,
            ppAffiliationValue: string,
            ppAffiliationCgiar: string,
            fromProfile: string,
          } = {
            personnel: _personnel,
            ppAffiliationValue: _ppAffiliationValue,
            ppAffiliationCgiar: _ppAffiliationCgiar,
            fromProfile: _fromProfile,
          };
          this.itemList.push(item);
        }
      );
  }

  loadProfile() {
    const username = this.authService.getUsername();
    if (username) {
      this.authService.profile({ username: username })
        .subscribe(
          (_profile: RespProfile) => {
            if (this.itemList.length < 1) {
              const personnel = new Personnel(
                this.id,
                null,
                null,
                _profile.firstName,
                _profile.lastName,
                _profile.emailAddress,
                _profile.affiliationId,
                _profile.affiliationName,
                _profile.affiliationNameOther,
                _profile.affiliationCenterId,
                _profile.orcid,
                'on', null, 'on'
              );
              this.post(personnel);
            } else {
              this.itemList[0].personnel.personFirstName = _profile.firstName;
              this.itemList[0].personnel.personLastName = _profile.lastName;
              this.itemList[0].personnel.personEmailAddress = _profile.emailAddress;
              this.itemList[0].personnel.personAffiliationId = _profile.affiliationId;
              this.itemList[0].personnel.personAffiliationName = _profile.affiliationName;
              this.itemList[0].personnel.personAffiliationNameOther = _profile.affiliationNameOther;
              this.itemList[0].personnel.personAffiliationCenterId = _profile.affiliationCenterId;
              this.itemList[0].personnel.personOrcid = _profile.orcid;

              this.itemList[0].ppAffiliationValue = _profile.affiliationId ?
                this.parameter2.find(obj => obj.parameterId.toString() == _profile.affiliationId).name : null;

              this.itemList[0].ppAffiliationCgiar = _profile.affiliationCenterId ?
                this.parameter3.find(obj => obj.parameterId.toString() == _profile.affiliationCenterId).name : null;

              this.itemList[0].fromProfile = 'on';

              this.put(this.itemList[0].personnel);
            }
          }
        );
    }
  }

  put(personnel: Personnel) {
    this.personnelService
      .put(personnel)
      .subscribe();
  }

  getParameterAll() {
    return this.parameterService
      .getAll('personnel', 'type')
      .subscribe((_parameter: Parameter[]) => {
        _parameter.forEach(element => {
          const parameterItem: {
            parameterId: string,
            name: string,
          } = {
            parameterId: element.parameterId.toString(),
            name: element.name.toString(),
          };
          this.parameter.push(parameterItem);
        });
      });
  }

  getParameterAll2() {
    return this.parameterService
      .getAll('personnel', 'affiliation')
      .subscribe((_parameter2: Parameter[]) => {
        _parameter2.forEach(element => {
          const parameterItem: {
            parameterId: string,
            name: string,
          } = {
            parameterId: element.parameterId.toString(),
            name: element.name.toString(),
          };
          this.parameter2.push(parameterItem);
        });
      });
  }

  getParameterAll3() {
    return this.parameterService
      .getAll('personnel', 'cgiar_center')
      .subscribe((_parameter3: Parameter[]) => {
        _parameter3.forEach(element => {
          const parameterItem: {
            parameterId: string,
            name: string,
          } = {
            parameterId: element.parameterId.toString(),
            name: element.name.toString(),
          };
          this.parameter3.push(parameterItem);
        });
      }
      );
  }

  remove(index: number) {
    this.itemList.splice(index, 1);
  }
}
