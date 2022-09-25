import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData={
    email:"",
    password:""
  }
  constructor(private login:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  loginUser(){
    console.log(this.loginUserData);
    this.login.loginUser(this.loginUserData).subscribe(
      (res:any)=>{
        console.log(res);
        localStorage.setItem('token',res.token)
        this.router.navigate(['/special'])
      },
      err=>console.log("this is error",err)
    )
  }
  
   
}
