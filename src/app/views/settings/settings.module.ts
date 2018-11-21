import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { ResourcesComponent } from './resources.component';
import { ResourceFormComponent } from './resource-form.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    ResourcesComponent,
    ResourceFormComponent
  ]
})
export class SettingsModule { }
