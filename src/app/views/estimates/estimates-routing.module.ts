import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
  
import { EstimatesComponent } from './estimates/estimates.component';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Estimates'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'estimates',
      },
      {
        path: 'estimates',
        component: EstimatesComponent
      },
      {
        path: 'estimate-new',
        component: EstimateFormComponent,
        data: {
          title: 'New Estimate'
        }
      },
      {
        path: 'estimate-edit/:id',
        component: EstimateFormComponent,
        data: {
          title: 'Edit Estimate'
        }
      },
      {
        path: 'estimate-clone/:id',
        component: EstimateFormComponent,
        data: {
          title: 'Clone Estimate'
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
export class EstimatesRoutingModule {}
