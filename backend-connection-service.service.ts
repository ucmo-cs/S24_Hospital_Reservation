import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectionServiceService {
  user: any ={
    name : null,
    email : null,
    password: null,
    phoneNumber: null,
    dob: null,
    gender: null,
    role: null,
    specialization: null,
    address: null,
    bankName: null,
    accountNumber : null,
    routingNumber: null,
    accountHolderName: null,
    selectedHospital: null,
    heightFeets: null,
    heightInches: null,
    healthDetails: null
  };
  isLoginSuccessful:boolean = false;
  isAdmin: boolean = false;
  isDoctor: boolean = false;
  isPatient : boolean = false;
  specializations: any =[];
  doctors: any =[];
  hospitals: any =[];
  schedules: any = [];
  appointmentToBePrescribed: any ;
  baseNodeUrl ='http://localhost:3001/';
  constructor(private httpclient : HttpClient) { }

  getUser(userEmail: any): Observable<any>{
    return this.httpclient.get(this.baseNodeUrl +'api/login?emailid='+userEmail);
  }

  addDoctor(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/doctor', reqBody);
  }

  addPatient(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/patient', reqBody);
  }

  getSpecializations(){
    return this.httpclient.get(this.baseNodeUrl +'api/get/specializations');
  }

  getHospitals(){
    return this.httpclient.get(this.baseNodeUrl +'api/get/hospitals');
  }

  addHospital(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/hospital', reqBody);
  }

  updateHospital(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/hospital', reqBody);
  }

  removeHospital(id: any){
    return this.httpclient.delete(this.baseNodeUrl +'api/remove/hospital?id='+id);
  }

  addSpecialization(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/specialization', reqBody);
  }

  updateSpecialization(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/specialization', reqBody);
  }

  removeSpecialization(id: any){
    return this.httpclient.delete(this.baseNodeUrl +'api/remove/specialization?id='+id);
  }

  updateDoctor(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/doctor', reqBody);
  }

  getDoctors(){
    return this.httpclient.get(this.baseNodeUrl +'api/get/doctors');
  }

  getSchedules(email: any){
    return this.httpclient.get(this.baseNodeUrl +'api/get/schedules?email=' + email);
  }

  addSchedule(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/schedule', reqBody);
  }

  updateSchedule(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/schedule', reqBody);
  }

  removeSchedule(id: any){
    return this.httpclient.delete(this.baseNodeUrl +'api/remove/schedule?id='+id);
  }
  
  getDoctorsBySpecialization(name : any){
    return this.httpclient.get(this.baseNodeUrl +'api/get/doctorsBySpecialization?name='+ name);
  }

  getschedulesByDate(day : any, id: any){
    return this.httpclient.get(this.baseNodeUrl +'api/get/schedulesByDate?doctorId='+ id + "&day=" +day);
  }

  addAppointment(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/appointment', reqBody);
  }

  addPayment(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/payment', reqBody);
  }

  getAppointments(id : any, isDoctor: any){
    return this.httpclient.get(this.baseNodeUrl +'api/get/appointments?id='+ id + "&isDoctor=" + isDoctor);
  }

  updateAppointmentStatus(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/appointmentStatus', reqBody);
  }

  updateAppointmentSchedule(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/appointmentSchedule', reqBody);
  }

  addPrescription(reqBody: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/add/prescription', reqBody);
  }

  getPatientDetails(email: any): Observable<any>{
    return this.httpclient.get(this.baseNodeUrl +'api/get/patientDetails?id='+ email);
  }

  getPrescriptionDetails(id: any): Observable<any>{
    return this.httpclient.get(this.baseNodeUrl +'api/get/prescription?id='+ id);
  }

  getAppointmentDetails(patientId: any, doctorId: any): Observable<any>{
    return this.httpclient.get(this.baseNodeUrl +'api/get/appointmentsForSlotCheck?patientId='+ patientId + "&doctorId=" +doctorId);
  }

  udpatePaymentDetailsInappointments(id: any): Observable<any>{
    return this.httpclient.post(this.baseNodeUrl +'api/update/appointmentPaymentStatus?id=' + id,null);
  }
}
