import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './user/components/login/login.component';
import { SignupComponent } from './user/components/signup/signup.component';
import { StartingPageComponent } from './user/components/startingPage/startingPage.component';
import { UserTableComponent } from './user/components/user-table/userTable.component';
import { HomePageComponent } from './user/components/home-page/homePage.component';

const routes: Routes =[
  {
    path:'TaskBord',
    component:StartingPageComponent,
  },
  {
    path: '',
    redirectTo: 'TaskBord',
    pathMatch: 'full',
  }, 
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
      //component:UserTableComponent,
  }]},
  {
    path:'home',
    component:HomePageComponent
  },
  {
    path: '**',
    redirectTo: '/TaskBord'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
