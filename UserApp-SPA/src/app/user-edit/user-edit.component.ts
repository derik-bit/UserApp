import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private alertify: AlertifyService, private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.bsConfig = {
      dateInputFormat: 'YYYY-MM-DD'
    };
    const userId = localStorage.getItem('editUserId');
    if (!userId) {
      this.alertify.error('User Id incorrect');
      this.router.navigate(['user-list']);
      return;
    }
    this.createUpdateForm();
    this.userService.getUser(userId)
      .subscribe( data => {
        this.userForm.setValue(data);
      });
  }

  createUpdateForm() {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      surName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  editUser() {
    if (this.userForm.valid) {
      this.user = Object.assign({}, this.userForm.value);
      this.userService.updateUser(this.user).subscribe(() => {
        this.alertify.success('User Updated successfully');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.userService.getUsers('').subscribe(() => {
          this.router.navigate(['user-list']);
        });
      });
    }
  }

  cancel() {
    this.router.navigate(['user-list']);
  }
}
