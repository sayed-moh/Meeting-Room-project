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
    startDate:string ='';
    endDate:string='';
    date!: String ;


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

    showDialog(id:string) {
       if (this.eventDetails ) {
            this.id=id
            this.title = this.eventDetails.title;
            this.description = this.eventDetails.extendedProps?.describtion || '';
            // this.date = this.eventDetails.start;
            this.startDate = this.formatDate(this.eventDetails.start) || '';
            console.log("****************"+this.eventDetails.start)
            this.endDate=this.formatDate(this.eventDetails.end) || '';
            this.form.setValue({
                "meetingName":this.title,
                "meetingDescription":this.description,
                "meetingStartDate":this.startDate,
                "meetingEndDate":this.endDate
            })
            this.visible = true;
          }
    }
    onSaveEdit(){
      const value=this.form.value
      console.log(value)
      const updatedEvent=new EventModel(
        this.id,
        value.meetingName,
        value.meetingStartDate,
        value.meetingEndDate,
        {describtion:value.meetingDescription}
      )
     this.eventService.updateEvent(parseInt(this.id),updatedEvent)
      this.visible=false
    }
}