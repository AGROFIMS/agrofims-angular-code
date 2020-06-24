
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AboutComponent } from './project/general-info/about/about.component';
import { DocumentationComponent } from './project/general-info/documentation/documentation.component';
import { ExperimentListComponent } from './project/experiment-core/experiment/experiment-list/experiment-list.component';
import { ExperimentAddComponent } from './project/experiment-core/experiment/experiment-add/experiment-add.component';
import { ExperimentEditComponent } from './project/experiment-core/experiment/experiment-edit/experiment-edit.component';
import { ExperimentManageComponent } from './project/experiment-core/experiment-manage/experiment-manage.component';
import { FundAgencyListComponent } from './project/experiment-core/fund-agency/fund-agency-list/fund-agency-list.component';
import { FundAgencyEditComponent } from './project/experiment-core/fund-agency/fund-agency-edit/fund-agency-edit.component';
import { PersonnelEditComponent } from './project/experiment-core/personnel/personnel-edit/personnel-edit.component';
import { PersonnelListComponent } from './project/experiment-core/personnel/personnel-list/personnel-list.component';
import { ProjEntityEditComponent } from './project/experiment-core/proj-entity/proj-entity-edit/proj-entity-edit.component';
import { ProjEntityListComponent } from './project/experiment-core/proj-entity/proj-entity-list/proj-entity-list.component';
import { ProjLeadEditComponent } from './project/experiment-core/proj-lead/proj-lead-edit/proj-lead-edit.component';
import { ProjLeadListComponent } from './project/experiment-core/proj-lead/proj-lead-list/proj-lead-list.component';
import { SiteAddComponent } from './project/experiment-core/site/site-add/site-add.component';
import { SiteEditComponent } from './project/experiment-core/site/site-edit/site-edit.component';
import { SiteListComponent } from './project/experiment-core/site/site-list/site-list.component';
import { ExpSiteAddComponent } from './project/experiment-core/exp-site/exp-site-add/exp-site-add.component';
import { ExpSiteEditComponent } from './project/experiment-core/exp-site/exp-site-edit/exp-site-edit.component';
import { ExpSiteListComponent } from './project/experiment-core/exp-site/exp-site-list/exp-site-list.component';
import { DataTableComponent } from './project/experiment-core/exp-site/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CropAddComponent } from './project/experiment-core/crop/crop-add/crop-add.component';
import { CropEditComponent } from './project/experiment-core/crop/crop-edit/crop-edit.component';
import { CropListComponent } from './project/experiment-core/crop/crop-list/crop-list.component';
import { SiteCropListComponent } from './project/experiment-core/site-crop/site-crop-list/site-crop-list.component';
import { SiteCropEditComponent } from './project/experiment-core/site-crop/site-crop-edit/site-crop-edit.component';
import { MeasurementEditComponent } from './project/experiment-core/measurement/measurement-edit/measurement-edit.component';
import { MeasurementListComponent } from './project/experiment-core/measurement/measurement-list/measurement-list.component';
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
    MeasurementEditComponent,
    MeasurementListComponent,
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
    MatSortModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
  // entryComponents: [ExpSiteAddComponent]
})
export class AppModule { }
