
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
import { FundAgencyAddComponent } from './project/experiment-core/fund-agency/fund-agency-add/fund-agency-add.component';
import { FundAgencyListComponent } from './project/experiment-core/fund-agency/fund-agency-list/fund-agency-list.component';
import { FundAgencyEditComponent } from './project/experiment-core/fund-agency/fund-agency-edit/fund-agency-edit.component';
import { ExpSiteListComponent } from './project/experiment-core/exp-site/exp-site-list/exp-site-list.component';
import { ExpSiteEditComponent } from './project/experiment-core/exp-site/exp-site-edit/exp-site-edit.component';
import { ExpSiteAddComponent } from './project/experiment-core/exp-site/exp-site-add/exp-site-add.component';
import { SiteAddComponent } from './project/experiment-core/site/site-add/site-add.component';
import { SiteEditComponent } from './project/experiment-core/site/site-edit/site-edit.component';
import { SiteListComponent } from './project/experiment-core/site/site-list/site-list.component';

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
    FundAgencyAddComponent,
    FundAgencyListComponent,
    FundAgencyEditComponent,
    ExpSiteListComponent,
    ExpSiteEditComponent,
    ExpSiteAddComponent,
    SiteAddComponent,
    SiteEditComponent,
    SiteListComponent
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
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
