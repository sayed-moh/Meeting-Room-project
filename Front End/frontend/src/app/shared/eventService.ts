import { BehaviorSubject, Observable, Subject, map } from "rxjs";
import { EventModel } from "./eventModel";
import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";



@Injectable()
export class EventService{

    constructor(private http:HttpClient){}
    private apiUrl='http://localhost:8030/api/events'
   

     events:EventModel[]=[    ]
    eventsChanged = new BehaviorSubject<EventModel[]>([]);

    getEventLength():string{
        return (this.events.length).toString();
    }

    getEvents():void{
         this.http.get<{message:string,data:any[]}>(this.apiUrl).pipe(
            
            map(response=>response.data)
            ).subscribe(
                events => {
                    this.events = events;
                    this.eventsChanged.next(this.events.slice());
                    console.log(events)
                },
                error => {
                    console.error('Error fetching events:', error);
                }
            );
    }
    getMeetingRoomsByOfficeId(officeId:number):Observable<any[]>{
        return this.http.get<{message:string,data:any[]}>(`http://localhost:8030/api/meeting-room/officeId/${officeId}`).pipe(
            map(response=>response.data)
        )
    }

    getMeetingRoomsById(id:number):Observable<string>{
        return this.http.get<{message:string,data:any[]}>(`http://localhost:8030/api/meeting-room/${id}`).pipe(
            map(response=>response.data[0].floor)
        )
    }
   
    getEventsByEmpId(empId:number):void{
         this.http.get<{message:string,data:any[]}>(`http://localhost:8030/api/events/empId/${empId}`).pipe(
            map(response=>response.data)
        ) .subscribe(
            events => {
                this.events = events;
                this.eventsChanged.next(this.events.slice());
                console.log(events)
            },
            error => {
                console.error('Error fetching events:', error);
            }
        );
    }

    getPendingEventsForEmpId(empId:number):void{
         this.http.get<{message:string,data:any[]}>(`http://localhost:8030/api/events/pending/${empId}`).pipe(
            map(response=>response.data)
        )
        .subscribe(
            events => {
                this.events = events;
        //   this.eventsChanged.next([...this.events]);

                this.eventsChanged.next(this.events.slice());
            },
            error => {
                console.error('Error fetching events:', error);
            } 
        )
    }
    editEventStatus(eventModel:EventModel):void{
        this.http.put<{message:string,data:any[]}>(`http://localhost:8030/api/events`,eventModel).pipe(
            map(response=>response.data[0])
        ).subscribe(
           event=>{
            console.log(event.status)
           } 
        )
    }


    getEventData(meetingRoomId:number,employeeId:number):Observable<{meetingRoomName:string,employeeName:string}>{
        return this.http.get<{meetingRoomName:string,employeeName:string}>(`http://localhost:8030/api/meeting-room/getname/${meetingRoomId}/${employeeId}`)
    }
    addEvent(event:EventModel):Observable<any[]>{
        return this.http.post<{message:string,data:any[]}>(`http://localhost:8030/api/events`,event).pipe(
            map(response =>response.data )
        );
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