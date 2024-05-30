import { Component, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { EventModel } from '../shared/eventModel';
import { EventService } from '../shared/eventService';
import { ToolbarTemplateDemo } from "../toolbar-template-demo/toolbar-template-demo.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

import { ButtonModule } from 'primeng/button';
import { Event } from '@angular/router';
import { DialogBasicDemo } from '../calender/editpopup/editpopup.component';

@Component({
    selector: 'app-myevents',
    templateUrl: './myevents.component.html',
    styleUrl: './myevents.component.css',
    standalone: true,
    imports: [ButtonModule,TableModule, SelectButtonModule, CommonModule, ToolbarTemplateDemo, SidebarComponent,DialogBasicDemo]
})
export class MyeventsComponent {
events!:EventModel[];
@ViewChild('editEvent') editEvent!:DialogBasicDemo;
first = 0;
rows=2;
constructor(private eventService:EventService)
{

}
ngOnInit() {
  this.events=this.eventService.getEvents();
}

onEdit(event:EventModel)
{
  console.log("helllooooo",event,this.editEvent.eventDetails);
  this.editEvent.eventDetails = event;
  this.editEvent.showDialog(String(event.id))
}
pageChange(event: { first: number; rows: any; }) {
  this.first = event.first;
  this.rows = event.rows;
}
ondelete(event:EventModel)
{
this.eventService.deleteEvent(Number(event.id),event);
}
}
