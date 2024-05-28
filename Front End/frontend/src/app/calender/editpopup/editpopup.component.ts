import { AfterContentInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, NgForm } from '@angular/forms';
import { EventImpl } from '@fullcalendar/core/internal';

@Component({
    selector: 'dialog-basic-demo',
    templateUrl: './editpopup.component.html',
    standalone: true,
    imports: [DialogModule,FormsModule,CalendarModule, ButtonModule, InputTextModule]
})
export class DialogBasicDemo implements OnInit{
   
    @Input() eventDetails: any;

    @ViewChild('form')
    form!: NgForm;

    title: string = '';
    description: string = '';
    date!: String ;


    ngOnInit(): void {
        // Initialize properties to prevent undefined access errors
        this.title = this.eventDetails?.title || '';
        this.description = this.eventDetails?.extendedProps?.describtion || '';
        // this.date =this.eventDetails?.start || Date.now();
        this.date = this.formatDate(this.eventDetails.start || new Date());

      }
   

    visible: boolean = false;

    formatDate(date: string | Date): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2); // Add leading zero
        const day = (`0${d.getDate()}`).slice(-2); // Add leading zero
        return `${year}-${month}-${day}`;
      }

    showDialog() {
       if (this.eventDetails ) {
            this.title = this.eventDetails.title;
            this.description = this.eventDetails.extendedProps?.describtion || '';
            // this.date = this.eventDetails.start;
            this.date = this.formatDate(this.eventDetails.start);

            this.form.setValue({
                "meetingName":this.title,
                "meetingDate":this.date,
                "meetingDescription":this.description
            })
            this.visible = true;
          }
    }
}