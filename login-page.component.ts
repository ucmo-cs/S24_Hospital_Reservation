import { Component, OnInit } from '@angular/core';
import { BackendConnectionServiceService } from 'src/app/services/backend-connection-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent  implements OnInit {

  constructor(private service: BackendConnectionServiceService, private router: Router){}
  user : any = {
    email: null,
    password: null
  }
  showNotApprovedMsg: boolean =false;
  showIncorrectPasswordError: boolean = false;
  showNoUser: boolean = false;
  isPasswordVisible: boolean = false;
  ngOnInit():void{

  }

  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  getData(){
    this.showNotApprovedMsg = false;
    this.showIncorrectPasswordError = false;
    this.showNoUser = false;
    this.service.getUser(this.user.email).subscribe((res)=>{
      if(res && res.details ){
        if(res.details[0].password ==  this.user.password){
          if(res.isDoctor && res.details[0].isApproved !== 1 ){
            this.showNotApprovedMsg = true;
            this.service.isLoginSuccessful = false;
            this.user ={
              email: null,
              password: null
            }
          }
          else{
            this.service.isLoginSuccessful = true;
            this.service.user = res.details[0];
            this.service.isAdmin = res.isAdmin;
            this.service.isDoctor = res.isDoctor;
            this.service.isPatient = res.isPatient;
            this.service.isAdmin ? this.router.navigateByUrl('/doctors') : 
            this.service.isPatient ? this.router.navigateByUrl('/bookAppointment') : 
            this.router.navigateByUrl('/appointments');
          }
         
        }
        else{
          this.showIncorrectPasswordError = true;
            this.service.isLoginSuccessful = false;
            this.user ={
              email: null,
              password: null
            }
        }
       
      }
      else{
        this.showNoUser = true;
        this.service.isLoginSuccessful = false;
        this.user ={
          email: null,
          password: null
        }
      }
    })
  }
}
