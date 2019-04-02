import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
  
import { EstimatesComponent } from './estimates/estimates.component';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';
import { ComponentFormComponent } from './component-form/component-form.component';

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
      },
      {
        path: 'component-new/:estimateId',
        component: ComponentFormComponent,
        data: {
          title: 'New Component'
        }
      },
      {
        path: 'component-edit/:id',
        component: ComponentFormComponent,
        data: {
          title: 'Edit Component'
        }
      },
      {
        path: 'component-clone/:id',
        component: ComponentFormComponent,
        data: {
          title: 'Clone Component'
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
