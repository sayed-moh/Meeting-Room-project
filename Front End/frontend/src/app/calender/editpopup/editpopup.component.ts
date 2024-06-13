import {  Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, NgForm } from '@angular/forms';
import { EventService } from '../../shared/eventService';
import { EventModel } from '../../shared/eventModel';

@Component({
    selector: 'dialog-basic-demo',
    templateUrl: './editpopup.component.html',
    standalone: true,
    imports: [DialogModule,FormsModule,CalendarModule, ButtonModule, InputTextModule]
})
export class DialogBasicDemo implements OnInit{
   
    @Input() eventDetails: any;

    @ViewChild('form') form!: NgForm;
    constructor(private eventService:EventService){}

    id:string='';
    title: string = '';
    description: string = '';
    status: string = '';
    startDate:string ='';
    endDate:string='';
    date!: String ;
    meetingRoomName!:string;
    meetingReserver!:string

    ngOnInit(): void {
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
            this.id=id
            this.title = this.eventDetails.title;
            this.description = this.eventDetails.extendedProps.description || '';
            console.log("saasdsadasds "+this.eventDetails.extendedProps.description)
            this.status=this.eventDetails.extendedProps.status || '';
            this.startDate = this.formatDate(this.eventDetails.startDate)||this.formatDate(this.eventDetails.start) || '';
            console.log("this.eventDetails.endDate",this.eventDetails.end)
            this.endDate=this.formatTime(this.eventDetails.endDate)|| this.formatTime(this.eventDetails.end)|| '';
            console.log("Meeting Room ID: " + this.eventDetails.extendedProps.meetingRoomId); // Corrected property access
            console.log("employee  ID: " + this.eventDetails.extendedProps.employeeId); // Corrected property access
            this.eventService.getEventData( this.eventDetails.extendedProps.meetingRoomId,
              this.eventDetails.extendedProps.employeeId
            ).subscribe(
              (response)=> {
                this.meetingRoomName=response.meetingRoomName
                this.meetingReserver=response.employeeName
                console.log("ssssssssssssssssssssss "+this.meetingRoomName)
                this.form.setValue({
                  "meetingName":this.title,
                  "meetingDescription":this.description,
                  "meetingStartDate":this.startDate,
                  "meetingEndDate":this.endDate,
                  "meetingStatus":this.status,
                  "meetingReserver":this.meetingReserver,
                  "meetingRoom":this.meetingRoomName
              })
              this.visible = true;
              }
            )
        

     
          }
    }
    onSaveEdit(){
    //   const value=this.form.value
    //   console.log(value)
    //   const updatedEvent=new EventModel(
    //     this.id,
    //     value.meetingName,
    //     value.meetingStartDate,
    //     value.meetingEndDate,
    //     {describtion:value.meetingDescription}
    //   )
    //  this.eventService.updateEvent(parseInt(this.id),updatedEvent)
    //   this.visible=false
    }
}