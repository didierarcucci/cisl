import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { EstimatesRoutingModule } from './estimates-routing.module';
import { EstimatesComponent } from './estimates/estimates.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';
import { ComponentFormComponent } from './component-form/component-form.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ComponentsComponent } from './components/components.component';
import { ComponentBreakdownComponent } from './component-breakdown/component-breakdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstimatesRoutingModule,
    NgxPaginationModule,
    AlertModule.forRoot()
  ],
  declarations: [
    EstimatesComponent,
    EstimateFormComponent,
    ComponentFormComponent,
    ComponentsComponent,
    ComponentBreakdownComponent
  ]
})
export class EstimatesModule { }
