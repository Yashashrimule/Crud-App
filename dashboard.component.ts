import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { JsonService } from '../services/json.service';
import { NgStyle } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgStyle,ReactiveFormsModule,NgFor,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  show:boolean=false;
  title:string="Add Member"
  editStudentId:string=""
  studentArr:any=[]
  fb=new FormGroup({
    fullname:new FormControl('',Validators.required),
    emailAdd:new FormControl('',Validators.required),
    dob:new FormControl('',Validators.required),
    gender:new FormControl('',Validators.required),
    mobile:new FormControl('',Validators.required),
    fees:new FormControl('0',Validators.required)
  })

  constructor(private service:JsonService,private router:Router){

    if(!service.checkToken()){
      router.navigate(['login'])
    }

    if(localStorage.getItem('token')==null){
      router.navigate([''])
    }
    this.getStudentList();



    
  }
  logout(){
    this.service.logout()
    this.router.navigate(['login'])
  }
  clearForm(){
    this.fb.controls['fullname'].setValue('')
    this.fb.controls['emailAdd'].setValue('')
    this.fb.controls['dob'].setValue('')
    this.fb.controls['gender'].setValue('')
    this.fb.controls['mobile'].setValue('')
    this.fb.controls['fees'].setValue('0')
  }

  getStudentList(){
    this.service.getStudent().subscribe({
      next:(res:any)=>{
        this.studentArr=res;
        console.log(this.studentArr)
      },error(err){
        console.log(err)
      }
    })
  }

  addStudent(){
    if(this.fb.valid){
      this.service.addStudent(this.fb.value).subscribe({
        next:()=>{
          alert('Member added successfully !!')
          this.clearForm();
          setTimeout(()=>{
            this.show=!this.show
          },1000)
          this.getStudentList();
        },error:(err:any)=>{
          alert(err)
        }
      })
    }
    else{
      this.service.updateStudent(this.editStudentId,this.fb.value).subscribe({
        next:()=>{
          alert("Member updated successfully !!")
          this.clearForm();
          setTimeout(()=>{
            this.show=!this.show
          },1500)
          this.getStudentList()
        },error(err){
          alert(err)
        },
      })
    }
    
  }
  
  deleteStudent(id:any){
    this.service.deleteStudent(id).subscribe({
      next:()=>{
        alert('Member deleted successfully !!')
        this.getStudentList();
      },error(err){
        console.log(err)
      },

    })
  }
  editStudent(id:any){
    this.show=!this.show
    this.title="Edit Member"
    this.editStudentId=id
    for (let index =0; index < this.studentArr.length; index++){
      const element = this.studentArr[index];
      if(element.id==id){
        this.fb.controls['fullname'].setValue(element.fullname);
        this.fb.controls['emailAdd'].setValue(element.emailAdd);
        this.fb.controls['dob'].setValue(element.dob);
        this.fb.controls['gender'].setValue(element.gender);
        this.fb.controls['mobile'].setValue(element.mobile);
        this.fb.controls['fees'].setValue(element.fees);
        break;
      }
    }
  }
  showForm(){
    this.show=!this.show
    this.title="Add Member"
    this.clearForm()
  }
}


