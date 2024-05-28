import { EventModel } from "./eventModel";


export class EventService{
    private events:EventModel[]=[
        new EventModel('1','studying','2024-05-27',{describtion:"i am studying full stack by angular and springboot"}),
        new EventModel('2','working','2024-06-30',{describtion:"i am working full stack by angular and springboot"})

    ]

    getEvents():EventModel[]{
        return this.events;
    }

    addEvent(event: EventModel): void {
        this.events.push(event);
      }
}