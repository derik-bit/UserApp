import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      UserListComponent,
      UserAddComponent,
      UserEditComponent,
      PageNotFoundComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpClientModule,
      BsDatepickerModule.forRoot(),
      BsDropdownModule.forRoot(),
      PaginationModule.forRoot(),
      ReactiveFormsModule,
      AppRoutingModule
   ],
   providers: [
      AlertifyService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
