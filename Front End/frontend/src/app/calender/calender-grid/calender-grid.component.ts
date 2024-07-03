
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation, viewChild } from '@angular/core';
import { CalendarOptions, EventClickArg, EventApi, EventHoveringArg   } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { OverlayPanel } from 'primeng/overlaypanel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OverlayPanelBasicDemo } from '../popup/popup.component';
import { EventService } from '../../shared/eventService';
import { EventModel } from '../../shared/eventModel';
import { DialogBasicDemo } from '../editpopup/editpopup.component';
import { Subscription } from 'rxjs';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { SharedServiceService } from '../../shared/shared-service.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { ToolbarTemplateDemo } from '../../toolbar-template-demo/toolbar-template-demo.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-calender-grid',
 templateUrl: './calender-grid.component.html',
 providers: [ConfirmationService, MessageService],
 imports: [ButtonModule, ToastModule,OverlayPanelBasicDemo,OverlayPanelModule,FullCalendarModule,FilterComponent, ConfirmPopupModule,TableModule, SelectButtonModule, CommonModule, ToolbarTemplateDemo, SidebarComponent,DialogBasicDemo],
 standalone:true,
  styleUrls: ['./calender-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalenderGridComponent implements AfterViewInit ,OnInit{
  @ViewChild('op') overlayPanel!: OverlayPanel;
  @ViewChild('eventDialog')  eventDialog!: DialogBasicDemo;

  subscription!:Subscription;
  eventsFetched = false;
  mousePosition = { x: 0, y: 0};
  selectedEvent: any;
  myEvents:any
  eventsBackend!:EventModel[]
  events!:EventModel[]

   mapEventModelToFullCalendarEvent(eventModel: EventModel): any {
    return {
      id: eventModel.id,
      title: eventModel.name,
      start: new Date(eventModel.date + 'T' + eventModel.startTime),
      end: new Date(eventModel.date + 'T' + eventModel.endTime),
      description: eventModel.description,
      status: eventModel.status,
      // Add any additional properties you want to pass to FullCalendar
    };
  }


 constructor(private sharedService:SharedServiceService,private eventService:EventService,public dialog: MatDialog,private overlayPanelBasicDemo: OverlayPanelBasicDemo){}
  ngOnInit(): void {
    this.eventsBackend=[];
    this.eventService.eventsChanged.subscribe(
      (data:EventModel[])=>{
        this.eventsBackend=data
        this.myEvents=this.eventsBackend.map(
          event=>({
            id: event.id,
            title: event.name,
            start: new Date(event.date + 'T' + event.startTime),
            end: new Date(event.date + 'T' + event.endTime),
            description: event.description,
            status: event.status,
            meetingRoomId:event.meetingRoomId,
            employeeId:event.employeeId
          })
            
        )
        this.calendarOptions.events = this.myEvents; 
        this.eventsFetched=true;
      }
    )
    // this.eventService.getEvents();
    this.eventService.getApprovedEvents();

    this.sharedService.ToggleButton(false)
    // this.sharedService.showMyButton=! this.sharedService.showMyButton

  }


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
   // hiddenDays: [4, 5], // 0=Sunday, 6=Saturday, hide these days
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventMouseEnter: this.handleEventMouseEnter.bind(this),
    eventMouseLeave: this.handleEventMouseLeave.bind(this),
    
    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dayHeaderContent: this.customDayHeader.bind(this)
  };

  ngAfterViewInit(): void {
    if (this.overlayPanel) {
      this.overlayPanel.hide();
    }
  }

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }


  handleEventClick(arg: EventClickArg) {
    this.eventDialog.eventDetails = arg.event;
    console.log(arg.event.id)
    if (this.eventDialog) {
      
      this.eventDialog.showDialog(arg.event.id);
    }
    
  }

  //handleEventMouseEnter(arg: EventHoveringArg) {
  handleEventMouseEnter(info: any) {

    setTimeout(() => { // Delay the operation slightly
      const jsEvent = info.jsEvent as MouseEvent;
      const rect = (jsEvent.target as HTMLElement).getBoundingClientRect();
      const y = jsEvent.clientX - rect.left;
      const x = jsEvent.clientY - rect.top;
      this.mousePosition.x = x;
      this.mousePosition.y = y;
      if (this.overlayPanel) {
        this.overlayPanel.show(jsEvent);
        this.selectedEvent=info.event;
      }
    }, 150);
  }

  handleEventMouseLeave(mouseLeaveInfo: any) {
    this.overlayPanel.hide();
  }



  customDayHeader(arg: { date: Date }): string {
    const day = arg.date.getDay();
    switch (day) {
      case 0:
        return 'Mon';
      case 1:
        return 'Tue';
      case 2:
        return 'Wed';
      case 3:
        return 'Thu';
      case 4:
        return 'Fri';
      case 5:
        return 'Sat';
      case 6:
        return 'Sun';
      default:
        return '';
    }
  }
}
