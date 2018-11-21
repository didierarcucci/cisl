import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resource } from '../../shared/classes/resource';
import { ResourceService } from '../../shared/services/resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.scss']
})
export class ResourceFormComponent implements OnInit {

  /* Lookups */
  teams:any = {};
  resourceTypes:any = {};
  roles:any = {};
  techStacks:any = {};
  locations:any = {};

  submitted = false;

  resource = new Resource();
  resourceId:any;

  actionType:any;

  constructor(private _resSvc: ResourceService, private route: ActivatedRoute, private router: Router) {
    this.resourceId = this.route.snapshot.params['id'];

         if (this.router.url.includes('clone')) this.actionType = 'clone';
    else if (this.router.url.includes('edit'))  this.actionType = 'edit';
    else if (this.router.url.includes('new'))   this.actionType = 'new';
    else                                        this.actionType = 'unknown';

    if (this.actionType == 'clone' || this.actionType == 'edit') this.getResourceDetails();
  }

  ngOnInit() {
    this.getTeams();
    this.getResourceTypes();
    this.getRoles();
    this.getTechStacks();
    this.getLocations();
  }

  onSubmit() {
    this.submitted = true;
    console.log(JSON.stringify(this.resource));
    if (this.actionType == 'edit') this.updateResource()
    else this.addResource();
    this.router.navigate(['settings/resources']);
  }

  getResourceDetails() {
    this._resSvc.getById(this.resourceId).subscribe((data: Resource) => {
      this.resource = data;
      if (this.actionType == 'clone') {
        this.resource.id = null;
        this.resource.resourceName = null;
        this.resource.startDateActive = null;
        this.resource.endDateActive = null;
      }
    });
  }

  addResource() {
    this._resSvc.addResource(this.resource).subscribe((result) => {
      console.log("resource added");
    }, (err) => {
      console.log(err);
    });
  }

  updateResource() {
    this._resSvc.updateResource(this.resource).subscribe((result) => {
      console.log("resource updated");
    }, (err) => {
      console.log(err);
    });
  }

  getTeams() {
    this.teams = {};
    this._resSvc.getLookupByCode('teams').subscribe((data: {}) => {
      this.teams = data;
    });
  }

  getResourceTypes() {
    this.resourceTypes = {};
    this._resSvc.getLookupByCode('resourcetypes').subscribe((data: {}) => {
      this.resourceTypes = data;
    });
  }

  getRoles() {
    this.roles = {};
    this._resSvc.getLookupByCode('roles').subscribe((data: {}) => {
      this.roles = data;
    });
  }

  getTechStacks() {
    this.techStacks = {};
    this._resSvc.getLookupByCode('techstacks').subscribe((data: {}) => {
      this.techStacks = data;
    });
  }

  getLocations() {
    this.locations = {};
    this._resSvc.getLookupByCode('locations').subscribe((data: {}) => {
      this.locations = data;
    });
  }

  get diagnostic() { return JSON.stringify(this.resource); }

}
