export class EventModel{
    id!: String;
    title!: String ;
    startDate!:string;
    endDate!:string;
    extendedProps: any;
    //describtion!: String;
    constructor(id: string, title: string, startDate: string,endDate:any,  extendedProps: any) { 
    this.id = id;
    this.title = title;
    this.startDate=startDate;
    this.endDate=endDate;
    this.extendedProps = extendedProps ;
    
  }

}