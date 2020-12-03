import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GeospatialData } from '../../../experiment-core/geospatial-data/model/geospatial-data';
import { GeospatialDataService } from '../../../experiment-core/geospatial-data/service/geospatial-data.service';
import { Parameter } from '../../../experiment-core/parameter/model/parameter';
import { ParameterService } from '../../../experiment-core/parameter/service/parameter.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private geospatialDataService: GeospatialDataService,
    private router: Router,
    private parameterService: ParameterService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  country = new FormControl('', [Validators.required]);
  geospatialDataList: GeospatialData[] = [];
  filteredOptions: Observable<string[]>;
  geospatialDataCountryList: { index: string; name: string }[] = [];

  colorMessage: string;
  messageShow: boolean;
  notification: string;

  username = new FormControl('', [Validators.required, Validators.email]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  affiliationId = new FormControl('');
  affiliationName = new FormControl();
  affiliationNameOther = new FormControl();
  affiliationCenterId = new FormControl();

  orcid = new FormControl('');

  registering = false;

  parameterAffiliation: Parameter[] = [];
  parameterCgiarCenter: Parameter[] = [];

  ngOnInit(): void {
    this.getGeospatialDataCountryList();

    this.getAffiliationList();
    this.getCgiarCenterList();

    this.filteredOptions = this.country.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }


  getGeospatialDataCountryList() {
    return this.geospatialDataService
      .getAll()
      .subscribe(
        (_geospatialDataCountryList: GeospatialData[]) => {
          _geospatialDataCountryList.forEach(element => {
            const index = element.GID_0;
            const name = element.NAME_0;
            const geospatialDataCountry: { index: string, name: string } = { index, name };
            this.geospatialDataCountryList.push(geospatialDataCountry);
          });
          this.country.setValue('');
        }
      );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionList: string[] = [];
    this.geospatialDataCountryList.forEach(element => {
      optionList.push(element.name);
    });
    return optionList.filter(option => option.toLowerCase().includes(filterValue));
  }


  getGeospatialDataList(value: string) { // Country
    return this.geospatialDataService
      .get(value)
      .subscribe(
        (_geospatialDataList: GeospatialData[]) => {
          this.geospatialDataList = _geospatialDataList;
        }
      );
  }


  register() {
    this.registering = true;

    this.authService.signup(
      {
        username: this.username.value,
        personTypeId: null,
        personTypeOther: null,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        orcid: this.orcid.value,
        affiliationId: this.affiliationId.value,
        affiliationName: this.affiliationName.value,
        affiliationNameOther: this.affiliationNameOther.value,
        affiliationCenterId: this.affiliationCenterId.value,
        country: this.country.value
      }
    ).subscribe(_response => {

      this.notification = _response.msg;
      if (_response.flag) {
        // this.colorMessage = 'green';
        // this.newMessage();
        this.registering = false;
        this.dialogRef.close('notification');
      } else {
        this.colorMessage = 'red';
        this.newMessage();
      }
    });
  }


  login() {
    this.dialogRef.close('login');
  }


  newMessage() {
    this.messageShow = true;
    setTimeout(() => {
      this.messageShow = false;
    }, 5000);
  }


  getAffiliationList() {
    return this.parameterService
      .getAll('personnel', 'affiliation')
      .subscribe((_parameterAffiliation: Parameter[]) => this.parameterAffiliation = _parameterAffiliation);
  }


  getCgiarCenterList() {
    return this.parameterService
      .getAll('personnel', 'cgiar_center')
      .subscribe((_parameterCgiarCenter: Parameter[]) => this.parameterCgiarCenter = _parameterCgiarCenter);
  }


  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    return this.username.hasError('email') ? 'Not a valid email' : '';
  }

  cleanPersonAffiliation() {

    this.affiliationCenterId.reset();
    this.affiliationName.reset();
    this.affiliationNameOther.reset();

    // this.affiliationCenterId.setValue('');
    // this.affiliationName.setValue('');
    // this.affiliationNameOther.setValue('');
  }

}
