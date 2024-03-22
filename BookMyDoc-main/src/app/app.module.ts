import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminDoctorsListViewComponent } from './components/admin-doctors-list-view/admin-doctors-list-view.component';
import { DoctorsPrescriptionComponent } from './components/doctors-prescription/doctors-prescription.component';
import { AdminAppointmentsComponent } from './components/admin-appointments/admin-appointments.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { AdminHospitalsViewComponent } from './components/admin-hospitals-view/admin-hospitals-view.component';
import { AdminSpecializationsComponent } from './components/admin-specializations/admin-specializations.component';
import { DoctorsScheduleComponent } from './components/doctors-schedule/doctors-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    AdminDoctorsListViewComponent,
    DoctorsPrescriptionComponent,
    AdminAppointmentsComponent,
    BookAppointmentComponent,
    AdminHospitalsViewComponent,
    AdminSpecializationsComponent,
    DoctorsScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
