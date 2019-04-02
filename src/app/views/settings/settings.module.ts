import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceFormComponent } from './resource-form/resource-form.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { RolesComponent } from './roles/roles.component';
import { RoleFormComponent } from './role-form/role-form.component';

import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ResourcesComponent,
    ResourceFormComponent,
    RolesComponent,
    RoleFormComponent
  ]
})
export class SettingsModule { }
