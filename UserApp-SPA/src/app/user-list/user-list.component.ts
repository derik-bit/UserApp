import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  userParams: any = {};
  pagination: Pagination = { totalItems : 0, itemsPerPage : 5, currentPage: 1, totalPages: 0 };
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  addUser() {
    this.router.navigate(['user-add']);
  }

  editUser(id: number) {
      localStorage.removeItem('editUserId');
      localStorage.setItem('editUserId', id.toString());
      this.router.navigate(['user-edit']);
   }
}
