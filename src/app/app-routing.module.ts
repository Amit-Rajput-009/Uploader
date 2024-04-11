import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocalStorageComponent } from './components/dashboard/local-storage/local-storage.component';
import { RequestsComponent } from './components/dashboard/requests/requests.component';
import { ThanksComponent } from './components/signup/thanks/thanks.component';
import { ContactAdminComponent } from './components/contact-admin/contact-admin.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogsComponent } from './components/logs/logs.component';
import { LandingPage } from './components/dashboard/landing.component';

export const routes: Routes = [
 
  {path:'', component:DashboardComponent ,canActivate: [AuthGuard],children:[
    {path:"",component:LandingPage},
    {path:"storage",component:LocalStorageComponent},
    {path:"requests",component:RequestsComponent},
    {path:"contact-admin",component:ContactAdminComponent},
    {path:"notification",component:NotificationComponent},
    {path:"profile",component:ProfileComponent},
    {path:"logs",component:LogsComponent},
    {path:'create-user', component:SignupComponent,children:[
    ]},
    { path: 'res/:status', component: ThanksComponent},
  ]},
  {path:'login', component:LoginComponent},
  // {path:'dashboard', component:DashboardComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
