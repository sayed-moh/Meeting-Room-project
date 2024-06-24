import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

   dataSource = new BehaviorSubject<boolean>(false);
   buttonSource=new BehaviorSubject<boolean>(false);
   
  changeData(value: boolean) {
    this.dataSource.next(value);
    console.log("inside service");
   
  }
  ToggleButton(value:boolean)
  {
    this.buttonSource.next(value)
  }
 
  constructor() { }
}
