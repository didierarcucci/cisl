import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../shared/classes/role';
import { RoleService } from '../../../shared/services/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  teams:any = {};

  submitted = false;

  role = new Role();
  roleId: any;

  actionType: any;

  constructor(private _roleSvc: RoleService, private route: ActivatedRoute, private router: Router) {
    this.roleId = this.route.snapshot.params['id'];

         if (this.router.url.includes('clone')) this.actionType = 'clone';
    else if (this.router.url.includes('edit'))  this.actionType = 'edit';
    else if (this.router.url.includes('new'))   this.actionType = 'new';
    else                                        this.actionType = 'unknown';

    if (this.actionType == 'clone' || this.actionType == 'edit') this.getRoleDetails();
  }

  ngOnInit() {
    this.getTeams();
  }

  onSubmit() {
    this.submitted = true;
    console.log(JSON.stringify(this.role));
    if (this.actionType == 'edit') this.updateRole()
    else this.addRole();
  }

  getRoleDetails() {
    this._roleSvc.getById(this.roleId).subscribe((data: Role) => {
      this.role = data;
      if (this.actionType == 'clone') {
        this.role.id = null;
      }
    });
  }

  addRole() {
    this._roleSvc.addRole(this.role).subscribe((result) => {
      console.log("role added");
      this.router.navigate(['settings/roles']);
    }, (err) => {
      console.log(err);
    });
  }

  updateRole() {
    this._roleSvc.updateRole(this.role).subscribe((result) => {
      console.log("role updated");      
      this.router.navigate(['settings/roles']);
    }, (err) => {
      console.log(err);
    });
  }

  getTeams() {
    this.teams = {};
    this._roleSvc.getLookupByCode('teams').subscribe((data: {}) => {
      this.teams = data;
    });
  }

  get diagnostic() { return JSON.stringify(this.role); }

}
