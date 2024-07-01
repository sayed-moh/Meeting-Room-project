import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { EventModel } from '../shared/eventModel';
import { EventService } from '../shared/eventService';
import { ToolbarTemplateDemo } from "../toolbar-template-demo/toolbar-template-demo.component";
import { SidebarComponent } from "../sidebar/sidebar.component";

import { ButtonModule } from 'primeng/button';
import { DialogBasicDemo } from '../calender/editpopup/editpopup.component';
import { MeetingRoomService } from '../shared/meeting-room.service';
import { meetingRoomModel } from '../shared/meetingRoomModel';
import { EditMeetingRoomComponent } from './edit-meeting-room/edit-meeting-room.component';
@Component({
  selector: 'app-my-meeting-rooms',
  templateUrl: './my-meeting-rooms.component.html',
  styleUrl: './my-meeting-rooms.component.css',
  standalone: true,
  imports: [ButtonModule,TableModule, SelectButtonModule, CommonModule, ToolbarTemplateDemo, SidebarComponent,EditMeetingRoomComponent]
})
export class MyMeetingRoomsComponent implements OnInit{

  @ViewChild('editMettingRoom') editMettingRoom!:EditMeetingRoomComponent;


  meetingRooms:meetingRoomModel[]=[]
  constructor(private meetingRoomService:MeetingRoomService){}
  empId=localStorage.getItem('employeeId')
  ngOnInit(): void {
    this.meetingRoomService.getMeetingRoomsByEmpId(Number(this.empId))
    this.meetingRoomService.meetingRoomChanged.subscribe(
      (meetingRooms:meetingRoomModel[])=>{
        this.meetingRooms=meetingRooms
      }
    )

  }

  onEdit(meetingRoom:meetingRoomModel){
    const index = this.meetingRooms.findIndex(meetingRoomModel => Number(meetingRoomModel.id) === Number(meetingRoom.id));
    console.log(index)
    console.log(meetingRoom.id)
    if (index !== -1)
      {
 
        this.editMettingRoom.meetingRoom=meetingRoom
        this.editMettingRoom.showDialog(String(index))

        // this.editEvent.showDialog(String(index))
      }
  }
  onDelete(meetingRoom:meetingRoomModel){
    this.meetingRoomService.deleteMeetingRoom(meetingRoom.id);
  }

}
