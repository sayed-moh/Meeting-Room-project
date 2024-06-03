import { Subject } from "rxjs";
import { EventModel } from "./eventModel";
import { state } from "@angular/animations";


export class EventService{
    private events:EventModel[]=[
        new EventModel('0','studying','2024-06-01T10:00:00','2024-06-01T12:00:00',{describtion:"i am studying full stack by angular and springboot",state:"pending"}),
        new EventModel('1','working','2024-05-05T11:00:00','2024-05-05T12:30:00',{describtion:"i am working full stack by angular and springboot",state:"pending"}),
        new EventModel('2','Playing','2024-05-29T13:00:00','2024-05-29T15:30:00',{describtion:"i am Playing full stack by angular and springboot",state:"pending"})

    ]
    eventsChanged=new Subject<EventModel[]>()

    getEventLength():string{
        return (this.events.length).toString();
    }
    getEvents():EventModel[]{
        return this.events;
    }

    addEvent(event: EventModel): void {
        this.events.push(event);
        this.eventsChanged.next(this.events.slice())
      }

    updateEvent(id:number,event:EventModel){
        this.events[id]=event
        this.eventsChanged.next(this.events.slice())
    }

    deleteEvent(id:number)
    {
        const index = this.events.findIndex(event => Number(event.id) === id);
        if (index !== -1) {
        this.events.splice(index,1);
        this.eventsChanged.next(this.events.slice());
        }
 
    }
}