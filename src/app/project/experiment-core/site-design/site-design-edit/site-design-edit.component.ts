import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Parameter } from '../../parameter/model/parameter';
import { ParameterService } from '../../parameter/service/parameter.service';
import { SiteDesign } from '../model/site-design';
import { SiteDesignService } from '../service/site-design.service';
import { SiteFactor } from '../../site-factor/model/site-factor';
import { SiteFactorService } from '../../site-factor/service/site-factor.service';

@Component({
  selector: 'app-site-design-edit',
  templateUrl: './site-design-edit.component.html',
  styleUrls: ['./site-design-edit.component.css']
})
export class SiteDesignEditComponent implements OnInit, OnChanges {

  @Input() siteDesign: SiteDesign;
  @Input() siteFactorList: SiteFactor[];
  parameterI: Parameter[] = [];

  numberList: string[] = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'
  ];

  constructor(
    private siteDesignService: SiteDesignService,
    private parameterService: ParameterService,
    private siteFactorService: SiteFactorService,
  ) { }

  ngOnInit(): void {
    this.getParameterI();
  }

  ngOnChanges() {
  }

  getParameterI() {
    return this.parameterService
      .getAll('site_design', 'design')
      .subscribe(
        (_parameter: Parameter[]) =>
          this.parameterI = _parameter.sort((a, b) => a.parameterId - b.parameterId)
      );
  }

  selectExperimentDesignAbbr($event: any) {
    const parameterCode = this.parameterI.filter(obj1 => obj1.parameterId === $event.value).map(obj2 => obj2.parameterCode)[0];
    this.siteFactorList.forEach(element => {
      element.status = 'off';
      if (element.experimentalDesignAbbr === parameterCode) {
        element.status = 'on';
      }
      this.siteFactorService.put(element).subscribe();
    });
    this.put();
  }

  put() {
    return this.siteDesignService
      .put(this.siteDesign)
      .subscribe();
  }
}
