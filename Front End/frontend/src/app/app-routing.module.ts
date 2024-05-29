import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authenticate/signup/signup.component';
import { SigninComponent } from './authenticate/signin/signin.component';
import { CalenderGridComponent } from './calender/calender-grid/calender-grid.component';

const routes: Routes = [
  {path:'',redirectTo:'/signin',pathMatch:"full"},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'dashboard',component:CalenderGridComponent},
  {path:'events',component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
