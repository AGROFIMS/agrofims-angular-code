
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  RouterModule
} from '@angular/router';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import {
  HttpClientModule, HttpClient
} from '@angular/common/http';
import {
  LocationStrategy, PathLocationStrategy
} from '@angular/common';
import {
  AppRoutes
} from './app.routing';
import {
  AppComponent
} from './app.component';
import {
  FlexLayoutModule
} from '@angular/flex-layout';
import {
  FullComponent
} from './layouts/full/full.component';
import {
  AppHeaderComponent
} from './layouts/full/header/header.component';
import {
  AppSidebarComponent
} from './layouts/full/sidebar/sidebar.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  DemoMaterialModule
} from './demo-material-module';
import {
  SharedModule
} from './shared/shared.module';
import {
  SpinnerComponent
} from './shared/spinner.component';
import {
  AboutComponent
} from './project/general-info/about/about.component';
import {
  DocumentationComponent
} from './project/general-info/documentation/documentation.component';
import {
  ExperimentListComponent
} from './project/experiment-core/experiment/experiment-list/experiment-list.component';
import {
  ExperimentAddComponent
} from './project/experiment-core/experiment/experiment-add/experiment-add.component';
import {
  ExperimentEditComponent
} from './project/experiment-core/experiment/experiment-edit/experiment-edit.component';
import {
  ExperimentManageComponent
} from './project/experiment-core/experiment-manage/experiment-manage.component';
import {
  FundAgencyListComponent
} from './project/experiment-core/fund-agency/fund-agency-list/fund-agency-list.component';
import {
  FundAgencyEditComponent
} from './project/experiment-core/fund-agency/fund-agency-edit/fund-agency-edit.component';
import {
  PersonnelEditComponent
} from './project/experiment-core/personnel/personnel-edit/personnel-edit.component';
import {
  PersonnelListComponent
} from './project/experiment-core/personnel/personnel-list/personnel-list.component';
import {
  ProjEntityEditComponent
} from './project/experiment-core/proj-entity/proj-entity-edit/proj-entity-edit.component';
import {
  ProjEntityListComponent
} from './project/experiment-core/proj-entity/proj-entity-list/proj-entity-list.component';
import {
  ProjLeadEditComponent
} from './project/experiment-core/proj-lead/proj-lead-edit/proj-lead-edit.component';
import {
  ProjLeadListComponent
} from './project/experiment-core/proj-lead/proj-lead-list/proj-lead-list.component';
import {
  SiteAddComponent
} from './project/experiment-core/site/site-add/site-add.component';
import {
  SiteEditComponent
} from './project/experiment-core/site/site-edit/site-edit.component';
import {
  SiteListComponent
} from './project/experiment-core/site/site-list/site-list.component';
import {
  ExpSiteAddComponent
} from './project/experiment-core/exp-site/exp-site-add/exp-site-add.component';
import {
  ExpSiteEditComponent
} from './project/experiment-core/exp-site/exp-site-edit/exp-site-edit.component';
import {
  ExpSiteListComponent
} from './project/experiment-core/exp-site/exp-site-list/exp-site-list.component';
import {
  DataTableComponent
} from './project/experiment-core/exp-site/data-table/data-table.component';
import {
  MatTableModule
} from '@angular/material/table';
import {
  MatPaginatorModule
} from '@angular/material/paginator';
import {
  MatSortModule
} from '@angular/material/sort';
import {
  CropAddComponent
} from './project/experiment-core/crop/crop-add/crop-add.component';
import {
  CropEditComponent
} from './project/experiment-core/crop/crop-edit/crop-edit.component';
import {
  CropListComponent
} from './project/experiment-core/crop/crop-list/crop-list.component';
import {
  SiteCropListComponent
} from './project/experiment-core/site-crop/site-crop-list/site-crop-list.component';
import {
  SiteCropEditComponent
} from './project/experiment-core/site-crop/site-crop-edit/site-crop-edit.component';
import {
  CropMeasurementEditComponent
} from './project/experiment-core/crop-measurement/crop-measurement-edit/crop-measurement-edit.component';
import {
  CropMeasurementListComponent
} from './project/experiment-core/crop-measurement/crop-measurement-list/crop-measurement-list.component';
import {
  LeafletModule
} from '@asymmetrik/ngx-leaflet';
import {
  SiteDesignEditComponent
} from './project/experiment-core/site-design/site-design-edit/site-design-edit.component';
import {
  SiteFactorListComponent
} from './project/experiment-core/site-factor/site-factor-list/site-factor-list.component';
import {
  SiteFactorEditComponent
} from './project/experiment-core/site-factor/site-factor-edit/site-factor-edit.component';
import {
  SiteFactorListIComponent
} from './project/experiment-core/site-factor/site-factor-list-i/site-factor-list-i.component';
import {
  SiteFactorListIiComponent
} from './project/experiment-core/site-factor/site-factor-list-ii/site-factor-list-ii.component';
import {
  SiteFactorListIiiComponent
} from './project/experiment-core/site-factor/site-factor-list-iii/site-factor-list-iii.component';
import {
  SiteFactorListIvComponent
} from './project/experiment-core/site-factor/site-factor-list-iv/site-factor-list-iv.component';
// import {
//   SoilEditComponent
// } from './project/experiment-core/soil/soil-edit/soil-edit.component';
// import {
//   SoilListComponent
// } from './project/experiment-core/soil/soil-list/soil-list.component';
import {
  WeatherEditComponent
} from './project/experiment-core/weather/weather-edit/weather-edit.component';
import {
  WeatherListComponent
} from './project/experiment-core/weather/weather-list/weather-list.component';
import {
  CropPhenologyEditComponent
} from './project/experiment-core/crop-phenology/crop-phenology-edit/crop-phenology-edit.component';
import {
  CropPhenologyListComponent
} from './project/experiment-core/crop-phenology/crop-phenology-list/crop-phenology-list.component';
import {
  SiteFactorEditIComponent
} from './project/experiment-core/site-factor/site-factor-edit-i/site-factor-edit-i.component';
import {
  SiteFactorEditIiComponent
} from './project/experiment-core/site-factor/site-factor-edit-ii/site-factor-edit-ii.component';
import {
  SiteFactorEditIiiComponent
} from './project/experiment-core/site-factor/site-factor-edit-iii/site-factor-edit-iii.component';
import {
  SiteFactorEditIvComponent
} from './project/experiment-core/site-factor/site-factor-edit-iv/site-factor-edit-iv.component';
import {
  SiteFactorEditVComponent
} from './project/experiment-core/site-factor/site-factor-edit-v/site-factor-edit-v.component';
import {
  SiteFactorEditViComponent
} from './project/experiment-core/site-factor/site-factor-edit-vi/site-factor-edit-vi.component';
import {
  SiteFactorEditViiComponent
} from './project/experiment-core/site-factor/site-factor-edit-vii/site-factor-edit-vii.component';
import {
  SiteFactorEditViiiComponent
} from './project/experiment-core/site-factor/site-factor-edit-viii/site-factor-edit-viii.component';
import {
  CropManPracticesEditComponent
} from './project/experiment-core/crop-man-practices/crop-man-practices-edit/crop-man-practices-edit.component';
import {
  CropManPracticesListComponent
} from './project/experiment-core/crop-man-practices/crop-man-practices-list/crop-man-practices-list.component';
import {
  CropManPracticesEditRowComponent
} from './project/experiment-core/crop-man-practices/crop-man-practices-edit-row/crop-man-practices-edit-row.component';
import {
  SiteDesignEditIComponent
} from './project/experiment-core/site-design/site-design-edit-i/site-design-edit-i.component';
import {
  SiteDesignEditIiComponent
} from './project/experiment-core/site-design/site-design-edit-ii/site-design-edit-ii.component';
import {
  SiteDesignEditIiiComponent
} from './project/experiment-core/site-design/site-design-edit-iii/site-design-edit-iii.component';
import {
  SiteDesignEditIvComponent
} from './project/experiment-core/site-design/site-design-edit-iv/site-design-edit-iv.component';
import {
  SiteDesignEditVComponent
} from './project/experiment-core/site-design/site-design-edit-v/site-design-edit-v.component';
import {
  SiteDesignEditViComponent
} from './project/experiment-core/site-design/site-design-edit-vi/site-design-edit-vi.component';
import {
  SiteDesignEditViiComponent
} from './project/experiment-core/site-design/site-design-edit-vii/site-design-edit-vii.component';
import {
  CropManPracticesTabListComponent
} from './project/experiment-core/crop-man-practices/crop-man-practices-tab-list/crop-man-practices-tab-list.component';
import {
  CropMeasurementTabListComponent
} from './project/experiment-core/crop-measurement/crop-measurement-tab-list/crop-measurement-tab-list.component';
import {
  CropPhenologyTabListComponent
} from './project/experiment-core/crop-phenology/crop-phenology-tab-list/crop-phenology-tab-list.component';
import {
  CropFertilizerEditComponent
} from './project/experiment-core/crop-fertilizer/crop-fertilizer-edit/crop-fertilizer-edit.component';
import {
  CropFertilizerListComponent
} from './project/experiment-core/crop-fertilizer/crop-fertilizer-list/crop-fertilizer-list.component';
import {
  CropFertilizerTabListComponent
} from './project/experiment-core/crop-fertilizer/crop-fertilizer-tab-list/crop-fertilizer-tab-list.component';
import {
  CropFertilizerEditRowComponent
} from './project/experiment-core/crop-fertilizer/crop-fertilizer-edit-row/crop-fertilizer-edit-row.component';
import {
  FactorFertilizerEditRowComponent
} from './project/experiment-core/factor-fertilizer/factor-fertilizer-edit-row/factor-fertilizer-edit-row.component';
import {
  FactorFertilizerEditComponent
} from './project/experiment-core/factor-fertilizer/factor-fertilizer-edit/factor-fertilizer-edit.component';
import {
  FactorFertilizerListComponent
} from './project/experiment-core/factor-fertilizer/factor-fertilizer-list/factor-fertilizer-list.component';
import {
  ManageDownloadSendComponent
} from './project/experiment-core/manage-download/manage-download-send/manage-download-send.component';
import { SiteFileListComponent } from './project/experiment-core/site-file/site-file-list/site-file-list.component';
import {
  StatisticalAnalysisListComponent
} from './project/analysis-core/statistical-analysis/statistical-analysis-list/statistical-analysis-list.component';
import { SurveyListComponent } from './project/survey-core/survey/survey-list/survey-list.component';
import { CropSoilEditComponent } from './project/experiment-core/crop-soil/crop-soil-edit/crop-soil-edit.component';
import { CropSoilListComponent } from './project/experiment-core/crop-soil/crop-soil-list/crop-soil-list.component';
import { CropSoilTabListComponent } from './project/experiment-core/crop-soil/crop-soil-tab-list/crop-soil-tab-list.component';
import { UtilDialogConfirmComponent } from './project/experiment-core/util-components/util-dialog-confirm/util-dialog-confirm.component';
import { LoginComponent } from './project/auth/containers/login/login.component';
import { RegisterComponent } from './project/auth/containers/register/register.component';
import { ProfileComponent } from './project/auth/containers/profile/profile.component';
import { AuthenticationComponent } from './project/auth/containers/authentication/authentication.component';
import { PasswordComponent } from './project/auth/containers/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AboutComponent,
    DocumentationComponent,
    ExperimentListComponent,
    ExperimentAddComponent,
    ExperimentEditComponent,
    ExperimentManageComponent,
    FundAgencyListComponent,
    FundAgencyEditComponent,
    PersonnelEditComponent,
    PersonnelListComponent,
    ProjEntityEditComponent,
    ProjEntityListComponent,
    ProjLeadEditComponent,
    ProjLeadListComponent,
    SiteAddComponent,
    SiteEditComponent,
    SiteListComponent,
    ExpSiteAddComponent,
    ExpSiteEditComponent,
    ExpSiteListComponent,
    DataTableComponent,
    CropAddComponent,
    CropEditComponent,
    CropListComponent,
    SiteCropListComponent,
    SiteCropEditComponent,
    CropMeasurementEditComponent,
    CropMeasurementListComponent,
    SiteDesignEditComponent,
    SiteFactorListComponent,
    SiteFactorEditComponent,
    SiteFactorListIComponent,
    SiteFactorListIiComponent,
    SiteFactorListIiiComponent,
    SiteFactorListIvComponent,
    WeatherEditComponent,
    WeatherListComponent,
    CropPhenologyEditComponent,
    CropPhenologyListComponent,
    SiteFactorEditIComponent,
    SiteFactorEditIiComponent,
    SiteFactorEditIiiComponent,
    SiteFactorEditIvComponent,
    SiteFactorEditVComponent,
    SiteFactorEditViComponent,
    SiteFactorEditViiComponent,
    SiteFactorEditViiiComponent,
    CropManPracticesEditComponent,
    CropManPracticesListComponent,
    CropManPracticesEditRowComponent,
    SiteDesignEditIComponent,
    SiteDesignEditIiComponent,
    SiteDesignEditIiiComponent,
    SiteDesignEditIvComponent,
    SiteDesignEditVComponent,
    SiteDesignEditViComponent,
    SiteDesignEditViiComponent,
    CropManPracticesTabListComponent,
    CropMeasurementTabListComponent,
    CropPhenologyTabListComponent,
    CropFertilizerEditComponent,
    CropFertilizerListComponent,
    CropFertilizerTabListComponent,
    CropFertilizerEditRowComponent,
    FactorFertilizerEditRowComponent,
    FactorFertilizerEditComponent,
    FactorFertilizerListComponent,
    ManageDownloadSendComponent,
    SiteFileListComponent,
    StatisticalAnalysisListComponent,
    SurveyListComponent,
    CropSoilEditComponent,
    CropSoilListComponent,
    CropSoilTabListComponent,
    UtilDialogConfirmComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthenticationComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    LeafletModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
