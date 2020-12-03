import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SiteService } from '../../site/service/site.service';
import { ExpSite } from '../model/exp-site';
import { ExpSiteService } from '../service/exp-site.service';
import { ParameterService } from '../../parameter/service/parameter.service';
import { Parameter } from '../../parameter/model/parameter';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../../site/model/site';
import { Experiment } from '../../experiment/model/experiment';
import { ExperimentService } from '../../experiment/service/experiment.service';
import { SiteCropListComponent } from '../../site-crop/site-crop-list/site-crop-list.component';
import { SiteCrop } from '../../site-crop/model/site-crop';
import { SiteFactorService } from '../../site-factor/service/site-factor.service';
import { CropMeasurementService } from '../../crop-measurement/service/crop-measurement.service';
import { SiteFactor } from '../../site-factor/model/site-factor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SiteCropService } from '../../site-crop/service/site-crop.service';
import { SiteDesign } from '../../site-design/model/site-design';
import { SiteDesignService } from '../../site-design/service/site-design.service';
import { MatDialog } from '@angular/material';
import { CropMeasurement } from '../../crop-measurement/model/crop-measurement';
// import { Weather } from '../../weather/model/weather';
// import { WeatherService } from '../../weather/service/weather.service';
import { ManageDownloadSendComponent } from '../../manage-download/manage-download-send/manage-download-send.component';

@Component({
  providers: [SiteCropListComponent],
  selector: 'app-exp-site-edit',
  templateUrl: './exp-site-edit.component.html',
  styleUrls: ['./exp-site-edit.component.css']
})
export class ExpSiteEditComponent implements OnInit, OnChanges {
  expId: string;
  experimentId: string;
  experimentStartDate: string;
  expSiteId: string = this.route.snapshot.paramMap.get('id');
  expSiteNameId: string;
  siteIList: any[];
  siteIIList: any[];
  site: Site;
  expSite: ExpSite;
  countryName = new FormControl();


  /* Parameters */
  parameterListI: Parameter[] = [];
  parameterListII: Parameter[] = [];
  parameterListIII: Parameter[] = [];
  parameterListIV: Parameter[] = [];
  parameterListV: Parameter[] = [];
  parameterListVii: Parameter[] = [];

  /* Components */
  siteCropList: SiteCrop[];
  siteFactorList: SiteFactor[];
  siteDesign: SiteDesign;

  // weatherList: Weather[];
  // soilList: Soil[];
  cropMeasurementList: CropMeasurement[];

  /* Other variables */
  demo1TabIndex = 0;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  itemsSelected: string[] = [];
  itemsOtherSelected: string[] = [];
  items: string[] = [
    'Crops',
    'Forest',
    'Grassland',
    'Savanna',
    'Shrubs',
    'Woodland',
    'Other'
  ];


  // mono_crop
  ec1 = '162';
  // inter_crop
  ec2 = '163';
  // relay_crop
  ec3 = '164';

  expNameValid = false;
  expProNameValid = false;
  cropSelectionValid = true;
  factorSelectionValid = true;
  levelsSettingValid = true;
  cropMeasurementValid = false;


  constructor(
    private siteService: SiteService,
    private expSiteService: ExpSiteService,
    private experimentService: ExperimentService,
    private parameterService: ParameterService,
    private cropMeasurementService: CropMeasurementService,
    private route: ActivatedRoute,
    private siteCropService: SiteCropService,
    private siteFactorService: SiteFactorService,
    private siteDesignService: SiteDesignService,
    // private weatherService: WeatherService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getParameterListI();
    this.getParameterListII();
    this.getParameterListIII();
    this.getParameterListIV();
    this.getParameterListV();
    this.getParameterVII();
    this.getSiteI();
    this.getExpSite();

    this.getSiteFactorList();
    this.getSiteCropList();
    this.getSiteDesign();
  }

  ngOnChanges() {
  }

  /* Main Functions */
  getParameterListI() {
    return this.parameterService
      .getAll('expSite', 'high_level')
      .subscribe((_parameter: Parameter[]) => this.parameterListI = _parameter);
  }
  getParameterListII() {
    return this.parameterService
      .getAll('expSite', 'site_vegetation')
      .subscribe((_parameter: Parameter[]) => this.parameterListII = _parameter);
  }
  getParameterListIII() {
    return this.parameterService
      .getAll('expSite', 'soil_class_system')
      .subscribe((_parameter: Parameter[]) => this.parameterListIII = _parameter);
  }
  getParameterListIV() {
    return this.parameterService
      .getAll('expSite', 'fao_soil_class_group')
      .subscribe((_parameter: Parameter[]) => this.parameterListIV = _parameter);
  }
  getParameterListV() {
    return this.parameterService
      .getAll('expSite', 'usda_soil_class_group')
      .subscribe((_parameter: Parameter[]) => this.parameterListV = _parameter);
  }
  getParameterVII() {
    return this.parameterService
      .getAll('expSite', 'previous_crop_fallow')
      .subscribe((_parameter: Parameter[]) => this.parameterListVii = _parameter);
  }
  getSiteI() {
    return this.siteService
      .getAll()
      .subscribe((_siteIList: any[]) => {
        this.siteIList = [...new Set(_siteIList.map(item => item.countryName))];
      });
  }
  getExpSite() {
    return this.expSiteService
      .get(this.expSiteId)
      .subscribe((_expSite: ExpSite) => {

        try {
          this.itemsSelected = _expSite.inSiteVegetation.split('|');
        } catch (error) {
        }

        try {
          this.itemsOtherSelected = _expSite.inSiteVegetationOther.split('|');
        } catch (error) {
        }

        this.experimentService
          .get(_expSite.experimentId)
          .subscribe((_experiment: Experiment) => {
            this.expId = _experiment.expId;
            this.experimentId = _experiment.experimentId.toString();
            this.experimentStartDate = _experiment.experimentStartDate;
            if (_experiment.experimentName) {
              this.expNameValid = true;
            }
            if (_experiment.experimentProjectName) {
              this.expProNameValid = true;
            }
            this.expSite = _expSite;
          });

        this.cropMeasurementService
          .getByExpId(this.expSiteId)
          .subscribe(
            (cropMeasurementList: CropMeasurement[]) => {
              this.cropMeasurementList = cropMeasurementList;
              if (cropMeasurementList && cropMeasurementList.length > 0) {
                this.cropMeasurementValid = true;
              }
            }
          );

        this.siteService.get(_expSite.siteId).subscribe((_site: Site) => {
          this.site = _site;
          this.expSiteNameId = _site.countryName + ' - ' + _site.name + ' (' + _site.sId + ')';
          this.countryName.setValue(_site.countryName);
          this.getSiteII();
        });

      });
  }

  /* Components */
  getSiteFactorList() {
    return this.siteFactorService
      .getById(this.expSiteId)
      .subscribe(
        (_siteFactorList: SiteFactor[]) => {
          this.siteFactorList = _siteFactorList;
        }
      );
  }
  getSiteCropList() {
    return this.siteCropService
      .getById(this.expSiteId)
      .subscribe(
        (_siteCropList: SiteCrop[]) => {
          this.siteCropList = _siteCropList;
        }
      );
  }
  getSiteDesign() {
    return this.siteDesignService
      .getById(this.expSiteId)
      .subscribe(
        (_siteDesign: SiteDesign) => {
          this.siteDesign = _siteDesign;
        }
      );
  }




  getSiteII() {
    return this.siteService
      .getAll()
      .subscribe((_siteIIList: any[]) => {
        this.siteIIList = _siteIIList.filter(
          item => item.countryName === this.countryName.value
        );
      });
  }
  siteChange() {

    switch (this.expSite.croppingTypeId) {

      case this.ec1:
        const cropCommonName = this.siteCropList
          .filter(obj_1 => obj_1.croppingTypeId === this.expSite.croppingTypeId)
          .map(obj_2 => obj_2.cropCommonName)[1];

        if (cropCommonName) {
          this.expSite.fieldbookId =
            'FM' + cropCommonName.replace(' ', '_')
            + this.experimentStartDate.slice(0, 7).replace('-', '')
            + '_' + this.countryName.value.replace(' ', '_');
        } else {
          this.expSite.fieldbookId =
            'FM' + this.experimentStartDate.slice(0, 7).replace('-', '')
            + '_' + this.countryName.value.replace(' ', '_');
        }
        break;

      case this.ec2:
        this.expSite.fieldbookId =
          'FInt' + this.experimentStartDate.slice(0, 7).replace('-', '')
          + '_' + this.countryName.value.replace(' ', '_');
        break;

      case this.ec3:
        this.expSite.fieldbookId =
          'FRel' + this.experimentStartDate.slice(0, 7).replace('-', '')
          + '_' + this.countryName.value.replace(' ', '_');
        break;

      default:
        break;

    }

    this.siteService.get(this.expSite.siteId).subscribe((_site: Site) => {
      this.site = _site;
      this.expSiteNameId = _site.countryName + ' - ' + _site.name + ' (' + _site.sId + ')';
      this.put();
    });

  }
  put() {
    this.expSite.inSiteVegetation = this.itemsSelected.join('|');
    this.expSiteService.put(this.expSite).subscribe();
  }

  prevCropNameClean() {
    this.expSite.prevCropNameOther = null;
    this.expSiteService
      .put(this.expSite)
      .subscribe();
  }


  inSiteVegetationClear() {
    if (!this.itemsSelected.includes('Other')) {
      this.itemsOtherSelected = [];
      this.expSite.inSiteVegetationOther = null;
    }
    this.put();
  }
  addChip(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      const index = this.itemsOtherSelected.indexOf(value);
      if (index < 0) {
        this.itemsOtherSelected.push(value.trim());
        this.expSite.inSiteVegetationOther = this.itemsOtherSelected.join('|');
        this.put();
      }
    }
    if (input) {
      input.value = '';
    }
  }
  removeChip(itemOther: string): void {
    const index = this.itemsOtherSelected.indexOf(itemOther);
    if (index >= 0) {
      this.itemsOtherSelected.splice(index, 1);
      this.expSite.inSiteVegetationOther = this.itemsOtherSelected.length > 0 ? this.itemsOtherSelected.join('|') : null;
      this.put();
    }
  }
  inHighLevelClean() {
    this.expSite.inHighLevelOther = null;
    this.put();
  }
  soilClassSystemClean() {
    this.expSite.soilClassGroupId = null;
    this.expSite.soilClassSystemOther = null;
    this.put();
  }
  next() {
    const tabCount = 9;
    this.demo1TabIndex = (this.demo1TabIndex + 1) % tabCount;
  }
  popup() {


    // this.getSiteFactorList();

    let _cropSelectionValid = 1;
    this.expSite.siteCropsOn.split('|').forEach(obj_1 => {
      _cropSelectionValid = _cropSelectionValid *
        (obj_1.split('.')[3] && !obj_1.split('.').includes('undefined') && !obj_1.split('.').includes('null') ? 1 : 0);
    });
    this.cropSelectionValid = _cropSelectionValid === 1 ? true : false;



    let _factorSelectionValid = 1;
    let _levelsSettingValid = 1;

    const checkList: {
      index: number,
      mark: number
    }[] = [];









    // let siteFactorList: SiteFactor[];

    // this.siteFactorService
    //   .getById(this.expSiteId)
    //   .subscribe(
    //     (_siteFactorList: SiteFactor[]) => {
    //       siteFactorList = _siteFactorList;
    //     }
    //   );


    this.siteFactorList.filter(obj_2 => obj_2.status === 'on').forEach(obj_3 => {

      console.log(obj_3.levelName);

      _factorSelectionValid = _factorSelectionValid * (obj_3.factorId ? 1 : 0);

      if (checkList.find(element => element.index === Number(obj_3.indexOrder))) {

        // console.log('found');
        // console.log(obj_3.levelName ? obj_3.levelName : '0');

        checkList.find(element => element.index === Number(obj_3.indexOrder)).mark =
          checkList.find(element => element.index === Number(obj_3.indexOrder)).mark +
          (obj_3.levelName ? obj_3.levelName.split('|').length : 0);
      } else {

        // console.log('not found');
        // console.log(obj_3.levelName ? obj_3.levelName : '0');

        checkList.push({ index: Number(obj_3.indexOrder), mark: (obj_3.levelName ? obj_3.levelName.split('|').length : 0) });
      }
    });

    checkList.forEach(obj_4 => {
      _levelsSettingValid = _levelsSettingValid * (obj_4.mark > 1 ? 1 : 0);
    });

    // console.log('_factorSelectionValid: ' + _factorSelectionValid.toString());
    // console.log('_levelsSettingValid: ' + _levelsSettingValid.toString());
    // console.log(checkList);

    this.factorSelectionValid = _factorSelectionValid === 1 ? true : false;
    this.levelsSettingValid = _levelsSettingValid === 1 ? true : false;








    const cropIdFAP = '57';
    let _cropMeasurementValid = 1;
    this.siteCropList
      .filter(obj1 => obj1.croppingTypeId === this.expSite.croppingTypeId && obj1.cropId !== cropIdFAP)
      .map(obj2 => obj2.siteCropId)
      .forEach(siteCropId => {
        _cropMeasurementValid = _cropMeasurementValid * ((
          this.cropMeasurementList.map(obj3 => obj3.siteCropId).includes(siteCropId)
        ) ? 1 : 0);
      });
    this.cropMeasurementValid = _cropMeasurementValid === 1 ? true : false;

    const dialogRef = this.dialog.open(ManageDownloadSendComponent, {
      data:
      {
        expNameValid: this.expNameValid,
        expProNameValid: this.expProNameValid,

        cropSelectionValid: this.cropSelectionValid,

        factorSelectionValid: this.factorSelectionValid,
        levelsSettingValid: this.levelsSettingValid,

        cropMeasurementValid: this.cropMeasurementValid,

        expSiteId: this.expSite.expSiteId,
        param1: this.expId + '_' + this.expSite.siteId + this.expSite.fieldbookId,
        param2: '0345',

        param3: 'prod',
        param4: null,
        param5: this.expSite.expSiteId,
        // param5: '86',

        param6: this.expSite.experimentId
        // param6: '176'

      },
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (`${result}` === 'true') {
      //   setTimeout(() => { this.getAllFull(); }, 500);
      // }
    });

  }
}

