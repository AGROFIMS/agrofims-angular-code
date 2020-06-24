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
      },
      {
        path: 'experiments/add',
        component: ExperimentAddComponent,
      },
      {
        path: 'experiments/manage/:id',
        component: ExperimentManageComponent,
      },
      {
        path: 'experiments/manage/:expId/site/:id',
        component: ExpSiteEditComponent,
      },
      {
        path: 'sites',
        component: SiteListComponent,
      },
      {
        path: 'sites/add',
        component: SiteAddComponent,
      },
      {
        path: 'sites/edit/:id',
        component: SiteEditComponent,
      },
      {
        path: 'crops',
        component: CropListComponent,
      },
      {
        path: 'crops/add',
        component: CropAddComponent,
      },
      {
        path: 'crops/edit/:id',
        component: CropEditComponent,
      },
    ],
  },
];
