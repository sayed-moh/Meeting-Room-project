import {  Component, Input, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { EventService } from '../../shared/eventService';
import { EventModel } from '../../shared/eventModel';
@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  standalone: true,
  imports: [DialogModule,FormsModule,CalendarModule, ButtonModule, InputTextModule]
})

export class AddeventComponent {

  @ViewChild('form') form!: NgForm;
  visible: boolean = false;

  constructor(private eventService:EventService){}


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

  showDialog() {
          this.visible = true;
  }


  onSaveEvent(){
    const title=this.form.value.meetingName
    const startDate=this.form.value.meetingStartDate
    const endDate=this.form.value.meetingEndDate
    const description=this.form.value.meetingDescription
    const newEvent=new EventModel(this.eventService.getEventLength(),title,startDate,endDate,{describtion:description});
    this.eventService.addEvent(newEvent)
    console.log("startDate "+startDate+" endDate "+endDate)
    this.form.reset()
    this.visible=false
  }

}



