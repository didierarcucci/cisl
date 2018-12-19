import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { EstimatesRoutingModule } from './estimates-routing.module';
import { EstimatesComponent } from './estimates/estimates.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EstimatesRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    EstimatesComponent,
    EstimateFormComponent
  ]
})
export class EstimatesModule { }
