import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ResourcesComponent } from './resources.component';
import { ResourceFormComponent } from './resource-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'resources',
      },
      {
        path: 'resources',
        component: ResourcesComponent,
        data: {
          title: 'Resources'
        }
      },
      {
        path: 'newresource',
        component: ResourceFormComponent,
        data: {
          title: 'New Resource'
        }
      },
      {
        path: 'resource-edit/:id',
        component: ResourceFormComponent,
        data: {
          title: 'Edit Resource'
        }
      },
      {
        path: 'resource-clone/:id',
        component: ResourceFormComponent,
        data: {
          title: 'Clone Resource'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
