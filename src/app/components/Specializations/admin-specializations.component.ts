import { Component } from '@angular/core';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-admin-specializations',
  templateUrl: './admin-specializations.component.html',
  styleUrls: ['./admin-specializations.component.scss']
})
export class AdminSpecializationsComponent {
  showAddForm: boolean = false;
  specialization: any = { name: '', description: '' };
  constructor(public service: BackendConnectionServiceService){}

  getSpecializations(){
    this.service.getSpecializations().subscribe((res)=>{
      if(res){
        this.service.specializations = res;
        this.service.specializations.forEach((specialization: any) => {
          specialization.editMode = false;
          specialization.updatedName = specialization.name;
          specialization.updatedDescription = specialization.description;
        });
      }

    })
  }

  addSpecialization(): void {
    this.service.addSpecialization({details:this.specialization}).subscribe(() => {
      this.getSpecializations();
      this.specialization = { name: '', description: '' };
      this.showAddForm = false;
    });
  }

  removeSpecialization(id: string): void {
    this.service.removeSpecialization(id).subscribe(() => {
      this.getSpecializations();
    });
  }

  toggleEditMode(specialization: any): void {
    specialization.editMode = !specialization.editMode;
  }

  saveChanges(specialization: any): void {
    var body ={
      _id: specialization._id,
      name: specialization.updatedName,
      description: specialization.updatedDescription
    }
    this.service.updateSpecialization({details:body}).subscribe(() => {
      specialization.editMode = false;
      this.getSpecializations();
    });
  }

  cancelEdit(specialization: any): void {
    specialization.editMode = false; 
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    this.specialization = { name: '', description: '' };
  }

}
