import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { AboutComponent } from './project/general-info/about/about.component';
import { DocumentationComponent } from './project/general-info/documentation/documentation.component';
import { ExperimentListComponent } from './project/experiment-core/experiment/experiment-list/experiment-list.component';
import { ExperimentAddComponent } from './project/experiment-core/experiment/experiment-add/experiment-add.component';
import { ExperimentManageComponent } from './project/experiment-core/experiment-manage/experiment-manage.component';
import { ExpSiteEditComponent } from './project/experiment-core/exp-site/exp-site-edit/exp-site-edit.component';
import { SiteListComponent } from './project/experiment-core/site/site-list/site-list.component';
import { SiteAddComponent } from './project/experiment-core/site/site-add/site-add.component';
import { SiteEditComponent } from './project/experiment-core/site/site-edit/site-edit.component';
import { CropListComponent } from './project/experiment-core/crop/crop-list/crop-list.component';
import { CropAddComponent } from './project/experiment-core/crop/crop-add/crop-add.component';
import { CropEditComponent } from './project/experiment-core/crop/crop-edit/crop-edit.component';
// tslint:disable-next-line: import-spacing
import { StatisticalAnalysisListComponent }
  from './project/analysis-core/statistical-analysis/statistical-analysis-list/statistical-analysis-list.component';
import { SurveyListComponent } from './project/survey-core/survey/survey-list/survey-list.component';
import { LoginComponent } from './project/auth/containers/login/login.component';
import { AuthGuard } from './project/auth/guards/auth.guard';
import { RandomGuard } from './project/auth/guards/random.guard';
import { RegisterComponent } from './project/auth/containers/register/register.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/about',
        pathMatch: 'full',
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'documentation',
        component: DocumentationComponent,
      },
      {
        path: 'experiments',
        component: ExperimentListComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'experiments/add',
        component: ExperimentAddComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'experiments/manage/:id',
        component: ExperimentManageComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'experiments/manage/:expId/site/:id',
        component: ExpSiteEditComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'sites',
        component: SiteListComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'sites/add',
        component: SiteAddComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'sites/edit/:id',
        component: SiteEditComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'crops',
        component: CropListComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'crops/add',
        component: CropAddComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'crops/edit/:id',
        component: CropEditComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'analysis',
        component: StatisticalAnalysisListComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
      {
        path: 'surveys',
        component: SurveyListComponent,
        canActivate: [RandomGuard],
        canLoad: [RandomGuard]
      },
    ],
  },
];
