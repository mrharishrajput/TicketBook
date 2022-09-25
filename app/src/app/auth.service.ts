import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
registerUrl="http://localhost:3000/api/register";
loginUrl="http://localhost:3000/api/login"
  constructor(private http:HttpClient , private route:Router) { }
  registerUser(user:any){
    return this.http.post(this.registerUrl,user)
  }
  loginUser(user: { email: string; password: string; }){
    return this.http.post(this.loginUrl,user);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem("token");
  }
  logOut(){
    localStorage.removeItem("token");
    this.route.navigate(["/login"])

  }
  
}
