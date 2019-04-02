import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EstimateComponent } from '../../../shared/classes/estimatecomponent';
import { EstimateService } from '../../../shared/services/estimate.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-component-form',
  templateUrl: './component-form.component.html',
  styleUrls: ['./component-form.component.scss']
})
export class ComponentFormComponent implements OnInit {

  component = new EstimateComponent();
  componentId: any;
  estimateId: any;

  actionType:any;
  submitted = false;

  complexityArray = ['Custom', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor( private _estSvc: EstimateService,
               private _route: ActivatedRoute,
               private _router: Router,
               private _alertSvc: AlertService) { 
    if (this._router.url.includes('clone'))      this.actionType = 'clone';
    else if (this._router.url.includes('edit'))  this.actionType = 'edit';
    else if (this._router.url.includes('new'))   this.actionType = 'new';
    else                                         this.actionType = 'unknown';
  
    if (this.actionType == 'clone' || this.actionType == 'edit') {
      this.componentId = this._route.snapshot.params['id'];
      this.getComponentDetails();
    } else if (this.actionType == 'new') {
      this.component.estimateId = this._route.snapshot.params['estimateId'];
    }
  }

  getComponentDetails() {
    console.log('get component details');
    this._estSvc.getComponentById(this.componentId).subscribe((data: EstimateComponent) => {
      this.component = data;
      if (this.actionType == 'clone') {
        this.component.id = null;
        this.component.name = this.component.name + ' (cloned)';
      }
    });
  }

  addComponent() {
    console.log('add component');
    this._estSvc.addComponent(this.component).subscribe((result) => {
      console.log("component added");
      this._alertSvc.add('success', 'Component has been added successfully!');
      this._router.navigate(['/estimates/estimate-edit', this.component.estimateId]);
    }, (err) => {
      this._alertSvc.add('error', 'An issue was encountered while adding the component.');
      console.log(err);
    });
  }

  updateComponent() {
    console.log('update component: '+ JSON.stringify(this.component));
    this._estSvc.updateComponent(this.component).subscribe((result) => {
      console.log("component updated");
      this._alertSvc.add('success', 'Component has been updated successfully!');
      //this._router.navigate(['/estimates/estimate-edit', this.component.estimateId]);
    }, (err) => {
      this._alertSvc.add('error', 'An issue was encountered while updating the component.');
      console.log(err);
    });
  }

  deleteComponent() {
    console.log('delete component: '+ JSON.stringify(this.component));
    this._estSvc.deleteComponent(this.component.id).subscribe((result) => {
      console.log("component deleted");
      this._alertSvc.add('success', 'Component has been deleted successfully!');
      this._router.navigate(['/estimates/estimate-edit', this.component.estimateId]);
    }, (err) => {
      this._alertSvc.add('error', 'An issue was encountered while deleting the component.');
      console.log(err);
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(JSON.stringify(this.component));
    if (this.actionType == 'edit') this.updateComponent()
    else this.addComponent();
  }

  ngOnInit() { }

}
