import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {



  constructor(private route:ActivatedRoute,private router:Router){}

  onRegister(){
    this.router.navigate(["/signup"],{relativeTo:this.route})
  }
  onSignin(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.router.navigate(["/dashboard"],{relativeTo:this.route})

    console.log("user email is "+email+" and user password is "+password)
  }
}
