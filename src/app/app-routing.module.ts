import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';

import {DoctorsComponent} from './views/doctors/doctors.component';
import {MedicamentsComponent} from './views/medicaments/medicaments.component';
import {AboutUsComponent} from './views/about-us/about-us.component';
import {ContactUsComponent} from './views/contact-us/contact-us.component';
import {LoginComponent} from './views/login/login.component';
import {DoctorsCreateComponent} from './views/doctors-create/doctors-create.component';
import {PatientsCreateComponent} from './views/patients-create/patients-create.component';
import {AdministratorComponent} from './views/administrator/administrator.component';
import {AppComponent} from './app.component';
import {ProfileComponent} from './views/profile/profile.component';
import {AuthGuardService as AuthGuard} from './services/auth/auth-guard.service';
import {RoleGuardService} from './services/auth/role-guard.service';
import {DashbordAppoinmentComponent} from './views/dashbord-appoinment/dashbord-appoinment.component';
import {ListPatientsComponent} from './views/list-patients/list-patients.component';
import {AppointmentEditComponent} from './views/appointment-edit/appointment-edit.component';
import {AppointmentCreateComponent} from './views/appointment-create/appointment-create.component';
import {ProfileDoctorComponent} from './views/profile-doctor/profile-doctor/profile-doctor.component';
import {ListAppointmentDoctorComponent } from './views/list-appointment-doctor/list-appointment-doctor.component';
import {ProfilePatientsDoctorComponent} from './views/profile-patients-doctor/profile-patients-doctor.component';

const routes: Routes = [
  {path : '', redirectTo:'home',
  pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'doctors', component: DoctorsComponent},
  {path: 'medicaments', component: MedicamentsComponent},
  {path: 'about_us', component: AboutUsComponent},
  {path: 'contact_us', component: ContactUsComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'login/patients_create', component: PatientsCreateComponent},
  {path: 'dashboard_appointment', component:DashbordAppoinmentComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['pathient']
    }
  },
  {path: 'dashboard_appointment/appointment_create', component:AppointmentCreateComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['pathient']
    }
  },
  {path: 'dashboard_appointment/appointment_create/:id', component:AppointmentEditComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['pathient']
    }
  },
  {path: 'profile_patients', component: ProfileComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['pathient']
    }
  },

  {path: 'doctor_create', component: DoctorsCreateComponent,
    canActivate : [RoleGuardService],
    data: {
      expectedRole: ['manager']
    }
  },
  
  {path: 'doctors/list', component : AdministratorComponent,
    canActivate: [AuthGuard]
  }, 
  {path: 'home_patients/appointment_create', component: AppointmentEditComponent,
    canActivate : [RoleGuardService],
    data:{
      expectedRole : ['pathient']
    }
  },
  {path: 'list_appointment_doctor', component:ListAppointmentDoctorComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['doctor']
  }
  },
  
  {path: 'list_appointment_doctor/profile_patients/:id', component: ProfilePatientsDoctorComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['doctor']
  }
  },

  {path: 'list_patients', component: ListPatientsComponent,
  canActivate : [RoleGuardService],
  data:{
    expectedRole : ['doctor']
  }
  },
  

  {path: 'dashboard_patients', component:DashbordAppoinmentComponent},
  {path: 'profile_doctor', component : ProfileDoctorComponent,
    canActivate : [RoleGuardService],
    data:{ 
      expectedRole : ['doctor', 'pathient']
    }
  },
  {path : '**' , redirectTo : 'home'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
