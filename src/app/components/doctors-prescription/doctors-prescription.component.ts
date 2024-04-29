import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-doctors-prescription',
  templateUrl: './doctors-prescription.component.html',
  styleUrls: ['./doctors-prescription.component.scss']
})
export class DoctorsPrescriptionComponent implements OnInit {

  patient: any = null;
  prescriptions: any =[];
  prescription: any ={
    medicineName: null,
    dosage: null,
    duration:null,
    timesPerDay : null,
    appointment : null
  }
  amount: any = null;
  constructor(public service: BackendConnectionServiceService, private router:Router){}


  ngOnInit():void{
    this.prescription.appointment = this.service.appointmentToBePrescribed;
    this.getPatientDetails();
  }

  getPatientDetails(){
    this.service.getPatientDetails(this.service.appointmentToBePrescribed.patientEmail).subscribe((res)=>{
      this.patient = res[0];
    })
  }

  removePrescription(pres: any, index: any){
    this.prescriptions.splice(index,1);
  }


  submitPrescription() {
    this.service.addPrescription(this.prescriptions).subscribe((res)=>{
      var body ={
        _id: this.service.appointmentToBePrescribed._id,
        status:"Prescription Added",
        amountInDollars: this.amount
      }
      this.service.updateAppointmentStatus(body).subscribe((res)=>
      {
        if(res){
          this.router.navigateByUrl('/appointments');
          this.service.appointmentToBePrescribed = null;
        }
      })
   
    })
  }

  addClicked(){
    this.prescriptions.push(this.prescription);
    this.prescription ={
      medicineName: null,
      dosage: null,
      duration:null,
      timesPerDay : null
    }
    this.prescription.appointment = this.service.appointmentToBePrescribed;
  }

  calculateAge(dob: any){
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }



}
