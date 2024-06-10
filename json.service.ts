import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of,throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get("http://localhost:3000/users");
  }
  addStudent(studentForm:any):Observable<any>{
    return this.http.post("http://localhost:3000/students",studentForm)   

  }
  getStudent():Observable<any>{
    return this.http.get("http://localhost:3000/students");

  }
  deleteStudent(id:any):Observable<any>{
    return this.http.delete("http://localhost:3000/students/"+id)
  }
  updateStudent(id:any,studentForm:any):Observable<any>{
    return this.http.put("http://localhost:3000/students/"+id,studentForm)
  }
  setToken(token:string){
    localStorage.setItem('token',token)
  }
  checkToken(){
    return localStorage.getItem('token') != null
  }
  logout(){
    localStorage.removeItem('token')
  }
  checkLogin(fullname:any,username:any,password:any):Observable<any>
  {
    if(fullname==fullname && username==username && password==password){
      this.setToken('abcde')
      return of({name:username ,email:username})
    }
    else{
      return throwError(new Error('Failed to login !!'))
    }
  }
}



