import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';

@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.scss']
})
export class AdminAppointmentsComponent implements OnInit {

  constructor(public service: BackendConnectionServiceService, private router: Router){}
  appointments: any =[];
  isRescheduleClicked:boolean= false;
  selectedTimeslot: any;
  selectedDate: any;
  schedules: any =[];
  slots: any  = [];
  prescriptionViewed : boolean = false;
  appointmentToViewPresc:any = null;
  prescriptions: any =[];
  isSlotAvaliable: boolean = true;
  appointmentsOfDoc:any =[];
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
  isShowPaymentSection: boolean = false;
  isShowPaynowBtn : boolean = false;
  appointmentSelected: any = null;


  ngOnInit():void{
    this.getAppointments();

  }

  showPaymentSection(){
this.isShowPaymentSection = true;
this.isShowPaynowBtn = false;
this.paymentDetails ={
  cardNumber: null,
  selectedPaymentMethod: null,
  cvv: null,
  nameOnCard: null,
  expireDate: null,
  appointmentId: null,
  amount: null
};
  }

  getAppointments(){
    this.service.getAppointments(this.service.isPatient || this.service.isDoctor ? this.service.user._id : null, this.service.isDoctor ? true: false).subscribe((res)=>{
      this.appointments = res;
      this.appointments.forEach((res: any)=>{
        res.isRescheduleClicked = false;
      })
    })
  }

  updateAppointment(appointment: any , status: any){
    var body ={
      _id: appointment._id,
      status: status
    }
    this.service.updateAppointmentStatus(body).subscribe((res)=>{
      this.getAppointments();
    })
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


  checkSlotAvaliability(appointmentEdit: any){
    if(this.selectedTimeslot){
      const index = this.appointmentsOfDoc.findIndex((appointment: any)=>
       appointment.timeSlot == this.selectedTimeslot && appointment.appointmentDate == this.selectedDate 
       && appointment.status != "Rejected" && appointment._id != appointmentEdit._id
       );
      this.isSlotAvaliable =  index != -1 ? false : true;
    }
    else{

      this.isSlotAvaliable =   true;
    }
  }

  RescheduleClicked(appointment: any){
    appointment.isRescheduleClicked = true;
    this.selectedDate = appointment.selectedDate;
    this.selectedTimeslot = appointment.selectedTimeslot;
  }

  cancelReschedule(appointment: any){
      appointment.isRescheduleClicked = false;
      this.selectedDate = null;
      this.selectedTimeslot = null;
      this.slots = [];
      this.schedules = [];
  }

  getDayOfWeek(selectedDate:any) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = selectedDate.getDay(); // Get the day index (0 for Sunday, 1 for Monday, etc.)
    const dayName = daysOfWeek[dayIndex + 1]; // Get the day name using the index
    return dayName; // Return the day name or day index as needed
  }

  onSelectedDateChange(appointment: any, event : any){
    const dateString = event.target.value;
    const updatedSelectedDate = dateString ? new Date(dateString) : null;
    this.appointmentsOfDoc =[];
    this.schedules = [];
    this.slots =[];

    var day = this.getDayOfWeek(updatedSelectedDate);
    this.service.getschedulesByDate(day, appointment.doctorId).subscribe((res)=>{
      this.service.getAppointmentDetails(this.service.user._id,appointment.doctorId).subscribe((app: any)=>{
        this.appointmentsOfDoc = app;
        this.schedules = res;
        this.generateSlots();
      })
    })
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

  submitReschedule(appointment: any){
    var body ={
      _id: appointment._id,
      date:this.selectedDate,
      timeSlot: this.selectedTimeslot ,
      status:"Rescheduled"
    }
    this.service.updateAppointmentSchedule(body).subscribe((res)=>{
      this.getAppointments();
      this.selectedDate = null;
      this.selectedTimeslot = null;
    })
  }

  addPrescription(appointment: any) {
    this.service.appointmentToBePrescribed  = appointment;
    this.router.navigateByUrl('/prescriptions');
  }

  viewPrescription(appointment: any ){
    this.appointmentSelected = appointment;
    this.prescriptionViewed = true;
    this.service.getPrescriptionDetails(appointment._id).subscribe((res)=>{
      if(appointment.isPaymentMade == false){
        this.isShowPaynowBtn = true;      
      }
      this.prescriptions = res;
    })
  }

  backClicked(){
    this.prescriptionViewed = false;
    this.prescriptions = [];
    this.reset();
  }

  submitPayment(){
     var appointmentId = this.appointmentSelected._id;
        this.paymentDetails.cvv= this.paymentDetails.cvv.toString();
        this.paymentDetails.cardNumber = this.paymentDetails.cardNumber.toString();
        this.paymentDetails["appointmentId"]= appointmentId;
        this.paymentDetails["amount"] = this.appointmentSelected.amountInDollars;
        this.service.addPayment(this.paymentDetails).subscribe((res)=>{
          this.service.udpatePaymentDetailsInappointments(this.appointmentSelected._id).subscribe((response)=>{
            this.reset();
            this.router.navigateByUrl('/appointments');
            this.getAppointments();
          })
        
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
    this.appointmentSelected = null;
    this.isShowPaymentSection = false;
    this.isShowPaynowBtn = false;
    this.prescriptionViewed = false;
    this.prescriptions = [];
  }

}
