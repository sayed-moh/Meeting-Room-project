import { Component, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { EventModel } from '../shared/eventModel';
import { EventService } from '../shared/eventService';
import { ToolbarTemplateDemo } from "../toolbar-template-demo/toolbar-template-demo.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

import { ButtonModule } from 'primeng/button';
import { DialogBasicDemo } from '../calender/editpopup/editpopup.component';
import { EventImpl } from '@fullcalendar/core/internal';
import { SharedServiceService } from '../shared/shared-service.service';

@Component({
    selector: 'app-myevents',
    templateUrl: './myevents.component.html',
    styleUrl: './myevents.component.css',
    standalone: true,
    imports: [ButtonModule,TableModule, SelectButtonModule, CommonModule, ToolbarTemplateDemo, SidebarComponent,DialogBasicDemo]
})
export class MyeventsComponent {
  eventsBackend!:EventModel[]
events!:EventModel[];
myEvents:any
 namee:string=""

@ViewChild('editEvent') editEvent!:DialogBasicDemo;

constructor(private eventService:EventService,private sharedServie:SharedServiceService)
{

}
ngOnInit() {

  this.eventService.eventsChanged.subscribe((events: EventModel[]) => {
    this.events = events;
    console.log("*********************"+events[0].meetingRoomId)
    // this.getMeetingRoomNameById(this.events[0].meetingRoomId)

});
  this.eventService.getEventsByEmpId(Number(localStorage.getItem("employeeId")));
  this.sharedServie.ToggleButton(true);
  // this.sharedServie.showMyButton=!this.sharedServie.showMyButton
  }


onEdit(eventModel:EventModel)
{
  const index = this.events.findIndex(event => Number(event.id) === Number(eventModel.id));
        if (index !== -1)
          {
     
            this.editEvent.eventDetails = (eventModel);
            console.log("event details",this.editEvent.eventDetails.description )
            this.editEvent.showDialog(String(index))
          }
}

ondelete(event:EventModel)
{
this.eventService.deleteEvent(Number(event.id));
}
}
