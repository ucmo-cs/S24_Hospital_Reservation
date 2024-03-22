import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminDoctorsListViewComponent } from './components/admin-doctors-list-view/admin-doctors-list-view.component';
import { DoctorsPrescriptionComponent } from './components/doctors-prescription/doctors-prescription.component';
import { AdminAppointmentsComponent } from './components/admin-appointments/admin-appointments.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { AdminHospitalsViewComponent } from './components/admin-hospitals-view/admin-hospitals-view.component';
import { AdminSpecializationsComponent } from './components/admin-specializations/admin-specializations.component';
import { DoctorsScheduleComponent } from './components/doctors-schedule/doctors-schedule.component';

const routes:Routes = [
  { path: '', component: RegistrationPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'login', component: LoginPageComponent },
  {path:'doctors', component:AdminDoctorsListViewComponent},
  {path:'prescriptions', component:DoctorsPrescriptionComponent},
  {path:'appointments', component:AdminAppointmentsComponent},
  {path:'bookAppointment', component:BookAppointmentComponent},
  {path:'hospital', component:AdminHospitalsViewComponent},
  {path:'specialization', component:AdminSpecializationsComponent},
  {path:'schedule', component:DoctorsScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
