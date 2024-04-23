import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {

  constructor(public service: BackendConnectionServiceService, private router : Router){}
  hospitals: any =[];
  doctors: any =[];
  timeSlots: any =[];
  selectedDate: any;
  selectedTimeSlot: any;
  selectedDoctor: any ;
  selectedSpecialization: any;
  selectedHospitalLocation: any;
  slots: any =[];
  schedules: any =[];
  selectedPaymentMethod: any;
  paymentDetails : any ={
    cardNumber: null,
    selectedPaymentMethod: null,
    cvv: null,
    nameOnCard: null,
    expireDate: null,
    appointmentId: null,
    amount: null
  };
  isDateValid: boolean = true;
  isFutureDate: boolean = true;
  isMonthValid: boolean = true;
  isCvvValid: boolean = true;
  isCardNumberValid: boolean = true;
  isSlotAvaliable: boolean = true;
  appointmentsOfDoc: any =[];
  ngOnInit():void{
    this.getDoctors();
  }
  cardNumberValidation(): boolean {
    return this.paymentDetails.cardNumber != null && this.paymentDetails.cardNumber != ""? /^\d{16}$/.test(this.paymentDetails.cardNumber) : true; 
  }

  securityCodeValidation(): boolean {
    return this.paymentDetails.cvv != null && this.paymentDetails.cvv != ""? /^\d{3}$/.test(this.paymentDetails.cvv) : true; 
  }

  validateCvv(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const cvvPattern = /^[0-9]{3,4}$/;
    this.isCvvValid = cvvPattern.test(inputValue);
}

validateExpiryDate(event: Event) {
  if((event.target as HTMLInputElement).value != null){
    const inputValue = (event.target as HTMLInputElement).value;
    const datePattern = /^\d{2}\/\d{2}$/;
    this.isDateValid = datePattern.test(inputValue);

    if (this.isDateValid) {
        const currentDate = new Date();
        const inputDateParts = inputValue.split('/');
        const inputMonth = Number(inputDateParts[0]);
        const inputYear = Number(inputDateParts[1]);
        const inputDate = new Date(2000 + inputYear, inputMonth - 1, 1);

        this.isMonthValid = inputMonth >= 1 && inputMonth <= 12;
        this.isFutureDate = inputDate > currentDate;
    }
  }
  else{
    this.isMonthValid = true;
    this.isFutureDate  = true;
  }
}

validateCardNumber(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const cardNumberPattern = /^[0-9]{16}$/;
    this.isCardNumberValid = cardNumberPattern.test(inputValue);
}

  submitAppointment(doctor: any){
    var doctorData  = this.service.doctors.filter((doc: any)=> doc._id == this.selectedDoctor)[0];
    var body={
      doctorId:  doctorData._id,
      doctorName:doctorData.name,
      patientName: this.service.user.name,
      patientId:this.service.user._id,
      patientNumber: this.service.user.phoneNumber,
      doctorNumber:doctorData.phoneNumber,
      appointmentDate: this.selectedDate,
      timeSlot: this.selectedTimeSlot,
      doctorEmail:doctorData.email,
      patientEmail: this.service.user.email,
      status: "Consultation Requested",
      isPaymentMade: false,
      patientVitalInfo: this.service.user.healthVitals
    }
    this.service.addAppointment(body).subscribe((res)=>{
      if(res && res.insertedId){
        this.reset();
        this.router.navigateByUrl('/appointments');
       
      }
    })
  }

  reset(){
    this.paymentDetails = {
      cardNumber: null,
      selectedPaymentMethod: null,
      cvv: null,
      nameOnCard: null,
      expireDate: null,
      appointmentId: null,
      amount: null
    };
    this.selectedDate = null;
    this.selectedDoctor = null;
    this.selectedSpecialization = null;
    this.selectedTimeSlot = null;

  }

  getDoctors(){
    this.service.getDoctors().subscribe((res)=>{
      if(res){
        this.service.doctors = res; 
        this.service.doctors = this.service.doctors.filter((res: any)=> res.isApproved = 1);
      }

    })
  }

  getHospitalAddress(doctor: any){
    return this.service.hospitals.find((hos: any)=> hos._id ==  doctor.hospitalId).address;
  }

  getDayOfWeek(selectedDate:any) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = selectedDate.getDay(); // Get the day index (0 for Sunday, 1 for Monday, etc.)
    const dayName = daysOfWeek[dayIndex + 1]; // Get the day name using the index
    return dayName; // Return the day name or day index as needed
  }
 

  onSpecializationChange(){
    var specialization = this.service.specializations.find((c: any)=> c._id == this.selectedSpecialization).name;
    this.service.getDoctorsBySpecialization(specialization).subscribe((res)=>{
      this.service.doctors = res;
      this.service.doctors = this.service.doctors.filter((res: any)=> res.isApproved = 1);
    })
  }

  onSelectedDateChange(event : any){
    const dateString = event.target.value;
    const updatedSelectedDate = dateString ? new Date(dateString) : null;
    this.appointmentsOfDoc =[];
    this.schedules = [];
    this.slots =[];
    this.paymentDetails = {
      cardNumber: null,
      selectedPaymentMethod: null,
      cvv: null,
      nameOnCard: null,
      expireDate: null,
      appointmentId: null,
      amount: null
    };
    var day = this.getDayOfWeek(updatedSelectedDate);
    this.selectedTimeSlot = null;
    this.service.getschedulesByDate(day, this.selectedDoctor).subscribe((res)=>{
      this.service.getAppointmentDetails(this.service.user._id,this.selectedDoctor).subscribe((app: any)=>{
        this.appointmentsOfDoc = app;
        this.schedules = res;
        this.generateSlots();
      })
     
    })
  }

  checkSlotAvaliability(){
    if(this.selectedTimeSlot){
      const index = this.appointmentsOfDoc.findIndex((appointment: any)=>
       appointment.timeSlot == this.selectedTimeSlot && appointment.appointmentDate == this.selectedDate && appointment.status != "Rejected"
       );
      this.isSlotAvaliable =  index != -1 ? false : true;
    }
    else{

      this.isSlotAvaliable =   true;
    }
  }

  clearConsultationFilter(){
    this.selectedSpecialization = null;
    this.getDoctors();
  }

  generateSlots(): void {
    this.schedules.forEach((schedule: any)=>{
      const startTime = new Date(`${this.selectedDate} ${schedule.startTime}`);
      const endTime = new Date(`${this.selectedDate} ${schedule.endTime}`);

      let currentTime = startTime;
  
      while (currentTime < endTime) {
        this.slots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    })
    
  }
}
