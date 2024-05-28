
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

@Component({
  selector: 'app-calender-grid',
 templateUrl: './calender-grid.component.html',

  styleUrls: ['./calender-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalenderGridComponent implements AfterViewInit ,OnInit{
  @ViewChild('op') overlayPanel!: OverlayPanel;
  @ViewChild('eventDialog')  eventDialog!: DialogBasicDemo;
  mousePosition = { x: 0, y: 0};
  selectedEvent: any;
  myEvents:any

  events:EventModel[]=[]

 constructor(private eventService:EventService,public dialog: MatDialog,private overlayPanelBasicDemo: OverlayPanelBasicDemo){}
  ngOnInit(): void {
    this.events = this.eventService.getEvents();
    // Transform EventModel[] to EventInput[]
    this.myEvents = this.events.map(event => ({
      id: event.id,
      title: event.title,
      start: event.date,
      describtion: event.extendedProps.describtion
    }));
    // Now assign myEvents to calendarOptions.events
    this.calendarOptions.events = this.myEvents;    
  }


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    hiddenDays: [4, 5], // 0=Sunday, 6=Saturday, hide these days
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventMouseEnter: this.handleEventMouseEnter.bind(this),
    eventMouseLeave: this.handleEventMouseLeave.bind(this),

    headerToolbar: {
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    // eventContent: this.renderEventContent.bind(this),
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
    console.log(arg.event)
    if (this.eventDialog) {
      
      this.eventDialog.showDialog();
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
