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

constructor(private eventService:EventService)
{

}
ngOnInit() {
  this.events=this.eventService.getEvents();
}



onEdit(eventModel:EventModel)
{
  console.log("helllooooo",);
  const index = this.events.findIndex(event => Number(event.id) === Number(eventModel.id));
        if (index !== -1)
          {
          this.editEvent.eventDetails = eventModel;
          this.editEvent.showDialog(String(index))
          }
}

ondelete(event:EventModel)
{
this.eventService.deleteEvent(Number(event.id));
}
}
