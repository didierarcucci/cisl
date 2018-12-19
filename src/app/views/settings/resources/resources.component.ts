import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '../../../shared/services/resource.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  allResources: any = [];
  @Input('data') resources:any = [];

  roleCount: any = [];
  techStackCount: any = [];
  locationCount: any = [];
  teamCount: any = [];
  activeCount: number;

  public config: PaginationInstance = {
    id: 'resources',
    itemsPerPage: 5,
    currentPage: 1
  };

  page: number = 1;

  filterId: string = 'active';

  constructor(private _resSvc: ResourceService) { }

  ngOnInit() {
    this.getResources();
    this.getResourceCountActive();
    this.getResourceCountByRole();
    this.getResourceCountByTechStack();
    this.getResourceCountByLocation();
    this.getResourceCountByTeam();
  }

  getResources() {
    this.resources = [];
    this._resSvc.getResources().subscribe((data: {}) => {
      this.allResources = data;
      this.filterActive();
    });
  }

  getResourceCountByRole() {
    this.roleCount = [];
    this._resSvc.getCountByRole().subscribe((data: {}) => {
      this.roleCount = data;
    });
  }

  getResourceCountByTechStack() {
    this.techStackCount = [];
    this._resSvc.getCountByTechStack().subscribe((data: {}) => {
      this.techStackCount = data;
    });
  }

  getResourceCountByLocation() {
    this.locationCount = [];
    this._resSvc.getCountByLocation().subscribe((data: {}) => {
      this.locationCount = data;
    });
  }

  getResourceCountByTeam() {
    this.teamCount = [];
    this._resSvc.getCountByTeam().subscribe((data: {}) => {
      this.teamCount = data;
    });
  }

  getResourceCountActive() {
    this._resSvc.getCountActive().subscribe((data: {}) => {
      this.activeCount = data[0].countResources;
    });
  }

  getPercent(curCount: number, totalCount: number) {
    let result = (curCount/totalCount);
    return result;
  }

  setProgressWidth(curCount: number, totalCount: number) {
    let result = this.getPercent(curCount, totalCount)*100;
    let style = {
      'width': result + '%'
    };
    return style;
  }

  filterActive() {
    this.filterId = 'active';
    this.resources = Array.from(this.allResources.filter((resource) => {
      return resource.activeFlag === true;
    }));
  }

  filterInactive() {
    this.filterId = 'inactive';
    this.resources = Array.from(this.allResources.filter((resource) => {
      return resource.activeFlag === false;
    }));
  }

  filterAll() {
    this.filterId = 'all';
    this.resources = Array.from(this.allResources);
  }

  filterLatest() {
    this.filterId = 'latest';
    this.resources = Array.from(this.allResources);
    this.resources.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }

  filterByRole(_role: string) {
    this.filterId = 'active';
    this.resources = Array.from(this.allResources.filter((resource) => {
      return resource.role === _role && resource.activeFlag === true;
    }));
  }

  filterByTechStack(_techStack: string) {
    this.filterId = 'active';
    this.resources = Array.from(this.allResources.filter((resource) => {
      return resource.techStack === _techStack && resource.activeFlag === true;
    }));
  }

  filterByLocation(_location: string) {
    this.filterId = 'active';
    this.resources = Array.from(this.allResources.filter((resource) => {
      return resource.location === _location && resource.activeFlag === true;
    }));
  }

  filterByTeam(_team: string) {
    this.filterId = 'active';
    this.resources = Array.from(this.allResources.filter((resource) => {
      return resource.team === _team && resource.activeFlag === true;
    }));
  }




}