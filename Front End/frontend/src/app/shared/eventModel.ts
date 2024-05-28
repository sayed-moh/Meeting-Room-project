export class EventModel{
    id!: String;
    title!: String ;
    date!: String;
    extendedProps: any;
    //describtion!: String;
    constructor(id: string, title: string, date: string,  extendedProps: any) { 
    this.id = id;
    this.title = title;
    this.date = date;
   // this.describtion=describtion
    this.extendedProps = extendedProps ;
    
  }

}