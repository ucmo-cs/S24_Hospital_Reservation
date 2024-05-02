import { Component } from '@angular/core';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-admin-hospitals-view',
  templateUrl: './admin-hospitals-view.component.html',
  styleUrls: ['./admin-hospitals-view.component.scss']
})
export class AdminHospitalsViewComponent {

  showAddForm: boolean = false;
  name   : any ;
  address: any ;
  type    :any ;
  phone   :any ;
  email   :any ;
  constructor(public service: BackendConnectionServiceService){}
  addHospital() {
    this.service.addHospital({details:this.getNewHospitalBody()}).subscribe(() => {
     this.getHospitals();
      this.showAddForm = !this.showAddForm
    });
  }

  saveHospital(hospital: any): void {
    var body = this.getUpdatedBody(hospital)
    this.service.updateHospital(body).subscribe(() => {
      this.getHospitals();
    });
  }

  toggleAddHospitalForm(): void {
    this.showAddForm = !this.showAddForm;
    this.name    =null;
    this.address=null;
    this.type   =null;
    this.phone  =null;
    this.email  =null;
  }


  removeHospital(hospitalId: string): void {
    
    this.service.removeHospital(hospitalId).subscribe(() => {
      this.getHospitals();
    });
  }

  toggleEditMode(hospital: any): void {
    hospital.editMode = !hospital.editMode;
  }

  getUpdatedBody(hospital: any){
    return {
      "_id": hospital._id,
      "name": hospital.updatedName,
      "address":hospital.updatedAddress,
      "type":hospital.updatedType,
      "phone": hospital.updatedPhone,
      "email": hospital.updatedEmail,
    }
  }

  getNewHospitalBody(){
    return {
      "name": this.name,
      "address":this.address,
      "type":this.type,
      "phone": this.phone,
      "email": this.email,
    }
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

    });
}
}
