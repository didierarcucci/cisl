import { Component, OnInit, Input } from '@angular/core';
import { RoleService } from '../../../shared/services/role.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: any = [];

  roleCount: any = [];

  public config: PaginationInstance = {
    id: 'roles',
    itemsPerPage: 5,
    currentPage: 1
  };

  page: number = 1;

  constructor(private _resSvc: RoleService) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.roles = [];
    this._resSvc.getRoles().subscribe((data: {}) => {
      console.log(data);
      this.roles = data;
    });
  }
}