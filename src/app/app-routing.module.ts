import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';

import {DoctorsComponent} from './views/doctors/doctors.component';
import {MedicamentsComponent} from './views/medicaments/medicaments.component';
import {AboutUsComponent} from './views/about-us/about-us.component';
import {ContactUsComponent} from './views/contact-us/contact-us.component';
import {LoginComponent} from './views/login/login.component';
const routes: Routes = [
  {path : '', redirectTo:'home',
  pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'doctors', component: DoctorsComponent},
  {path: 'medicaments', component: MedicamentsComponent},
  {path: 'about_us', component: AboutUsComponent},
  {path: 'contact_us', component: ContactUsComponent},
  {path : 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
