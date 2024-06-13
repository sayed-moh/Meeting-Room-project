import { Component, OnInit } from '@angular/core';
import { EventModel } from '../shared/eventModel';
import { EventService } from '../shared/eventService';
 
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { ToolbarTemplateDemo } from '../toolbar-template-demo/toolbar-template-demo.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DialogBasicDemo } from '../calender/editpopup/editpopup.component';
 
 
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css',
  standalone: true,
  imports: [ButtonModule,TableModule, SelectButtonModule, CommonModule, ToolbarTemplateDemo, SidebarComponent,DialogBasicDemo]
 
})
export class ApprovalComponent implements OnInit {
  pendingEvents:EventModel[]=[];
  constructor(private eventService:EventService)
  {}
  ngOnInit(): void {
        this.eventService.getPendingEventsForEmpId(Number(localStorage.getItem("employeeId")));

    this.eventService.eventsChanged.subscribe((events:EventModel[])=>{
      this.pendingEvents=events;
      if (this.pendingEvents && this.pendingEvents.length > 0 && this.pendingEvents[0].employeeDto) {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeee events: " + this.pendingEvents[0].employeeDto.firstName);
      } else {
        console.log("Pending events are empty or employeeDto is undefined");
      }
    })

  }
 
 
  onApprove(eventModel:EventModel)
  {
    eventModel.status="approved"
    this.eventService.editEventStatus(eventModel)
    console.log("*************** :"+eventModel.employeeDto )    
  }
  onDecline(eventModel:EventModel)
  {
    eventModel.status="declined"
    this.eventService.editEventStatus(eventModel)
    console.log("*************** :"+eventModel.employeeDto )      
    }
}