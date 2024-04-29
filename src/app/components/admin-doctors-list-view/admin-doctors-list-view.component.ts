import { Component, OnInit } from '@angular/core';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-admin-doctors-list-view',
  templateUrl: './admin-doctors-list-view.component.html',
  styleUrls: ['./admin-doctors-list-view.component.scss']
})
export class AdminDoctorsListViewComponent implements OnInit {

  constructor(public service: BackendConnectionServiceService){}
  doctors : any =[];

  ngOnInit():void{
    this.getDoctors();
  }

  updateDoctor(doctor: any, status: any){
    this.service.updateDoctor({_id:doctor._id, isApproved: status}).subscribe((res)=>{
      this.getDoctors();
    })
  }

  getDoctors(){
    this.service.getDoctors().subscribe((res)=>{
      if(res){
        this.service.doctors = res; 
        this.service.doctors = !this.service.isAdmin ? this.service.doctors.filter((res: any)=> res.isApproved == 1) : this.service.doctors;
      }

    })
  }

  getStatus(isApproved : any){
    return isApproved == 0 ? "Yet To Be Reviewed" : isApproved == 1 ? "Approved" :"Marked As InActive";
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
