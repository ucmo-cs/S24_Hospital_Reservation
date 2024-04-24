import { Component, OnInit } from '@angular/core';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-doctors-schedule',
  templateUrl: './doctors-schedule.component.html',
  styleUrls: ['./doctors-schedule.component.scss']
})
export class DoctorsScheduleComponent  implements OnInit{
  addButtonCLicked: boolean = false;
  newSchedule: any;
  schedules: any =[];
  today: any = new Date().toISOString().split('T')[0];

  constructor(public service: BackendConnectionServiceService){}
  ngOnInit(): void {
    this.newSchedule = {
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      isAvailable: true,
      doctorId: this.service.user._id,
      doctorName: this.service.user.name,
      doctorEmail: this.service.user.email,
      doctorPhone: this.service.user.phoneNumber,
      doctor: this.service.user,
      consultationFee: null
    }
    this.getSchedules();
  }

  toggleAddButton(){
    this.addButtonCLicked = true;
  }

  cancelAddSchedule(){
    this.newSchedule= {
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      isAvailable: true,
      doctorId: this.service.user._id,
      doctorName: this.service.user.name,
      doctorEmail: this.service.user.email,
      doctorPhone: this.service.user.phoneNumber,
      doctor: this.service.user,
      
      consultationFee: null
    }
    this.addButtonCLicked = false;
  }

  getSchedules(){
    this.service.getSchedules(this.service.user.email).subscribe((res)=>{
      this.service.schedules = res;
      this.service.schedules.forEach((schedule: any)=>{
        schedule.updatedDayOfWeek = schedule.dayOfWeek;
        schedule.updatedStartTime= schedule.startTime;
        schedule.updatedEndTime = schedule.endTime;
        schedule.isAvailable= true;
        schedule.editMode = false;
      })
    })
  }

  dayOfWeekSelected(event: any){
    this.newSchedule.dayOfWeek = event.target.value;
  }

  dayOfWeekSelectedForUpdation(event: any){
    this.newSchedule.updatedDayOfWeek = event.target.value;
  }

  addSchedule(){
    this.service.addSchedule(this.newSchedule).subscribe((res)=>{
      this.cancelAddSchedule();

      this.getSchedules();
    })
  }

  updateSchedule(schedule: any){
    var body ={
      _id: schedule._id,
      dayOfWeek: schedule.updatedDayOfWeek,
      startTime:  schedule.updatedStartTime,
      endTime:  schedule.updatedEndTime,
      isAvailable: true
    }
    this.service.updateSchedule(body).subscribe((res: any)=>{
      this.getSchedules();
    })
  }

  toggleEditMode(schedule: any): void {
    schedule.editMode = !schedule.editMode;
  }


  removeSchedule(schedule: any){
    this.service.removeSchedule(schedule._id).subscribe((res)=>{
      this.getSchedules();
    })
  }

  cancelEdit(schedule: any){
    schedule.editMode = !schedule.editMode;
    schedule.updatedDayOfWeek = schedule.dayOfWeek;
    schedule.updatedStartTime= schedule.startTime;
    schedule.updatedEndTime = schedule.endTime;
  }
}
