import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ResourcesComponent } from './resources/resources.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';

import { RolesComponent } from './roles/roles.component';
import { RoleFormComponent } from './role-form/role-form.component';

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
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Roles'
        }
      },
      {
        path: 'newrole',
        component: RoleFormComponent,
        data: {
          title: 'New Role'
        }
      },
      {
        path: 'role-edit/:id',
        component: RoleFormComponent,
        data: {
          title: 'Edit Role'
        }
      },
      {
        path: 'role-clone/:id',
        component: RoleFormComponent,
        data: {
          title: 'Clone Role'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
