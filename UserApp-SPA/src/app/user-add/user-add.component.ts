import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent  implements OnInit {
  user: User;
  userForm: FormGroup;
  constructor(private alertify: AlertifyService, private fb: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.createUpdateForm();
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

  addUser() {
    if (this.userForm.valid) {
      this.user = Object.assign({}, this.userForm.value);
      this.user.id = 0;
      this.userService.updateUser(this.user).subscribe(() => {
        this.alertify.success('User Added successfully');
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
