import {  Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { EventService } from '../../shared/eventService';
import { EventModel } from '../../shared/eventModel';
import { CommonModule } from '@angular/common';
import { SharedServiceService } from '../../shared/shared-service.service';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

interface meetingRoom {
  name: string;
  id: number;
}

@Component({
    selector: 'dialog-basic-demo',
    templateUrl: './editpopup.component.html',
    standalone: true,
    imports: [DialogModule,MessagesModule,DropdownModule,FormsModule,CalendarModule, ButtonModule,CommonModule, InputTextModule]
})
export class DialogBasicDemo implements OnInit{
   
    @Input() eventDetails: any;
    meetingRooms: meetingRoom[] =[];

    message: string = '';
    messages!: Message[] ;

    @ViewChild('form') form!: NgForm;
    constructor(private eventService:EventService,private sharedService:SharedServiceService){}

    id:string='';
    title: string = '';
    description: string = '';
    status: string = '';
    startDate:string ='';
    endDate:string='';
    date!: String ;
    meetingRoooomId:any
    employeeIddd:any
    meetingRoomNameee!:string;
    showMyButton=false;
    meetingReserver!:string
    holdingEvent:EventModel | undefined
    ngOnInit(): void {
      this.sharedService.buttonSource.subscribe(value => this.showMyButton = value);
      this.eventService.getMeetingRoomsByOfficeId(Number(localStorage.getItem('empOfficeId'))).subscribe(response => {
        response.forEach(meetingRoom => {this.meetingRooms.push(meetingRoom)});
        console.log("sayed"+this.meetingRooms[0].name);
      });
      }
   

    visible: boolean = false;

    formatDate(date: string | Date): string {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (`0${d.getMonth() + 1}`).slice(-2); // Add leading zero
      const day = (`0${d.getDate()}`).slice(-2); // Add leading zero
      const hours = (`0${d.getHours()}`).slice(-2);
      const minutes = (`0${d.getMinutes()}`).slice(-2);
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    formatTime(date: string | Date): string {
      if (!date) return '';
      const d = new Date(date);
      
      const hours = (`0${d.getHours()}`).slice(-2);
      const minutes = (`0${d.getMinutes()}`).slice(-2);
      
      return `${hours}:${minutes}`;
    }

    showDialog(id:string) {
       if (this.eventDetails ) {
        console.log("event details in show dialog "+this.eventDetails.description)
            this.id=id
            this.title =this.eventDetails.name ||this.eventDetails.title || "";
            this.description = this.eventDetails.description ||this.eventDetails.extendedProps.description || '';
            this.status=this.eventDetails.status || this.eventDetails.extendedProps.status ||'';
            this.startDate = this.formatDate(this.eventDetails.startDate)||this.formatDate(this.eventDetails.start) ||  this.formatDate(this.eventDetails.date+'T'+this.eventDetails.startTime) ||'';
            console.log("this.eventDetails.endDate",this.eventDetails.end)
            this.endDate=this.eventDetails.endTime ||this.formatTime(this.eventDetails.endTime)|| this.formatTime(this.eventDetails.end)|| '';
   
            this.meetingRoooomId=this.eventDetails.meetingRoomId || this.eventDetails.extendedProps.meetingRoomId
            this.employeeIddd=this.eventDetails.employeeId || this.eventDetails.extendedProps.employeeId
            
            this.eventService.getEventData( this.meetingRoooomId,
              this.employeeIddd
            ).subscribe(
              (response)=> {
                this.meetingRoomNameee=response.meetingRoomName
                this.meetingReserver=response.employeeName
                console.log("yarab "+this.meetingRoomNameee)

                if(this.showMyButton){
                  this.form.setValue({
                    "meetingName":this.title,
                    "meetingDescription":this.description,
                    "meetingStartDate":this.startDate,
                    "meetingEndDate":this.endDate,
                    "meetingStatus":this.status,
                    "meetingReserver":this.meetingReserver,
                    "reserverCountry" : localStorage.getItem("countryName"),
                    "reserverGov" :localStorage.getItem("govName"),
                    "reserverOffice": localStorage.getItem("officeName"),
                    "meetingRoom":this.meetingRoomNameee
                })
                }else{
                  this.form.setValue({
                    "meetingName":this.title,
                    "meetingDescription":this.description,
                    "meetingStartDate":this.startDate,
                    "meetingEndDate":this.endDate,
                    "meetingStatus":this.status,
                    "meetingReserver":this.meetingReserver,
                    "reserverCountry" : "",
                    "reserverGov" :"",
                    "reserverOffice": "",
                    "meetingRoom":""
                })
                }
              
              this.visible = true;
              }
            )
        

     
          }
    }
    onSaveEdit(form:Form){
      const value=this.form.value
      const[date, startTime] = value['meetingStartDate'].split('T');
      console.log("sswwwwwwwwww "+this.meetingRoooomId)
      const updatedEvent=new EventModel(Number(this.eventDetails.id),
        value['meetingName'],
        startTime,
        value['meetingEndDate'],
        date,
        value['meetingDescription'],
        value['meetingStatus'],
        
        this.form.value.meetingRoom.id,
       this.employeeIddd,
      );


     this.eventService.updateEvent(updatedEvent).subscribe(response=>{
      this.message=response.message
      console.log("*************************"+ this.form.value.meetingRoom.name)
      this.holdingEvent=this.eventService.events[Number(this.id)]
      this.eventService.events[Number(this.id)]=(response.data[0]);
      this.eventService.events[Number(this.id)].roomDto={};
      this.eventService.events[Number(this.id)].roomDto.floor= updatedEvent.roomDto.floor,
      this.eventService.events[Number(this.id)].roomDto.status=this.holdingEvent.roomDto.status||"",
      this.eventService.events[Number(this.id)].meetingRoomId=response.data[0].meetingRoomId
      this.eventService.eventsChanged.next(this.eventService.events.slice());
      this.visible=false

     }, error => 
      {
        console.error('add event failed:', error);
        if (error.error && error.error.message) {
          this.message = error.error.message; // Set the error message from response
          this.messages = [
            { severity: 'error', detail: this.message },
        ];        
        
        } else {
          console.error('Error creating event:', error);
        }
      }
    )
    }
}