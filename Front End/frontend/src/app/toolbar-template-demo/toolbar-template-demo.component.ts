import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import {  SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AddeventComponent } from '../calender/addevent/addevent.component';
import { Subscription } from 'rxjs';
import { EventService } from '../shared/eventService';
import { EventModel } from '../shared/eventModel';
import { SharedServiceService } from '../shared/shared-service.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'toolbar-template-demo',
    templateUrl: './toolbar-template-demo.component.html',
    standalone: true,
    imports: [ToolbarModule, ButtonModule, AvatarModule, SharedModule, AddeventComponent, SidebarComponent,CommonModule]
})
export class ToolbarTemplateDemo {
  @ViewChild('addEvent') addEvent!:AddeventComponent;
  seen: boolean=false;
  constructor(private sharedService:SharedServiceService,private route:ActivatedRoute,private router:Router,private eventService:EventService){}


  onSidebar(){
    this.sharedService.changeData(true)
  }

  onAddEvent(){
    console.log("hello dear")
    this.addEvent.showDialog()
    
  }

  toDashboard()
  {
    this.router.navigate(['/dashboard'],{relativeTo:this.route})
  }

  onSignout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin'],{relativeTo:this.route})
  }
}