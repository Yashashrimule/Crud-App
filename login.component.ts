import { Component } from '@angular/core';
import { JsonService } from '../services/json.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink} from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  users:any=[]
  fb:FormGroup=new FormGroup({
    fullname:new FormControl('',Validators.required),
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  onLogin(){
    if(this.fb.valid){
      let fullname=this.fb.controls['fullname'].value
      let username=this.fb.controls['username'].value
      let password=this.fb.controls['password'].value
      let flag:boolean=false;
      for (let index = 0; index < this.users.length; index++){
        const element = this.users[index];
        if(element.fullname==fullname  && element.username==username && element.password==password){
          flag=true;
          this.service.checkLogin(this.fb.controls['fullname'].value,this.fb.controls['username'].value,this.fb.controls['password'].value)
          break;
        }
      }
      if(flag){
        alert("Login Successfully Done...!!");
        this.router.navigate(['dashboard'])

      }else{
        alert("Login Failed !!")
        this.fb.controls['fullname'].setValue('')
        this.fb.controls['username'].setValue('')
        this.fb.controls['password'].setValue('')
      }
    }
  }
  constructor(private service:JsonService,private router:Router){
    service.getUsers().subscribe({
      next:(val:any)=>{
        this.users=val;
        console.log(this.users)
       
      }
      
    })
    if(service.checkToken()){
      router.navigate(['dashboard'])
    }
  }

}
