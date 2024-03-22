import { Component, OnInit } from '@angular/core';
import { BackendConnectionServiceService } from './services/backend-connection-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(public service: BackendConnectionServiceService, private router: Router){}

  ngOnInit(): void {
    this.getSpecializations();
  }

  getSpecializations(){
    this.service.getSpecializations().subscribe((res)=>{
      if(res){
        this.service.specializations = res;
        this.service.specializations.forEach((specialization: any) => {
          specialization.editMode = false;
          specialization.updatedName = specialization.name;
          specialization.updatedDescription = specialization.description;
        });
        this.getHospitals();
      }

    })
  }

  getHospitals(){
    this.service.getHospitals().subscribe((res)=>{
      if(res){
        this.service.hospitals = res;
        
        this.service.hospitals.forEach((hospital: any) => {
          hospital.editMode = false;
          hospital.updatedName = hospital.name;
          hospital.updatedAddress = hospital.address;
          hospital.updatedType = hospital.type;
          hospital.updatedPhone = hospital.phone;
          hospital.updatedEmail = hospital.email;
        });
      }

    })
  }


  logOut(){
    this.service.user = null;
    this.service.isLoginSuccessful = false;
    this.router.navigateByUrl('');
  }
}
