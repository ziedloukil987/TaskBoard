import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from './components/login/forgot-password-dialog.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StartingPageComponent } from './components/startingPage/startingPage.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserTableComponent } from './components/user-table/userTable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IncrementDatePipe } from './components/user-table/increment-date.pipe';
import { HomePageComponent } from './components/home-page/homePage.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordDialogComponent,
    StartingPageComponent,
    SignupComponent,
    IncrementDatePipe,
    HomePageComponent,
    UserTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule
  ],
  providers:[
    UserService
  ]
})
export class UserModule { }
