import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { Observable, from } from 'rxjs';
import { Order } from './order.model';


@Injectable()
export class StaticDataSource
{
  private events: Event[] =
  [
    new Event(1, 'Event 1', 'Date 1', 'Short Description 1' , 10),
    new Event(2, 'Event 2', 'Date 2',  'Short Description 2' , 10),
    new Event(3, 'Event 3', 'Date 3',  'Short Description 3' , 10),
    new Event(4, 'Event 4', 'Date 4',  'Short Description 4' , 10),
    new Event(5, 'Event 5', 'Date 5',  'Short Description 5' , 10),
    new Event(6, 'Event 6', 'Date 6',  'Short Description 6' , 10),
    new Event(7, 'Event 7', 'Date 7',  'Short Description 7' , 10),
    new Event(8, 'Event 8', 'Date 8',  'Short Description 8' , 10),
    new Event(9, 'Event 9', 'Date 9',  'Short Description 9' , 10),
    new Event(10, 'Event 10', 'Date 10', 'Short Description 10' , 10),
    new Event(11, 'Event 11', 'Date 11', 'Short Description 11' , 10),
    new Event(12, 'Event 12', 'Date 12',  'Short Description 12' , 10),
    new Event(13, 'Event 13', 'Date 13',  'Short Description 13' , 10),
    new Event(14, 'Event 14', 'Date 14',  'Short Description 14' , 10),
    new Event(15, 'Event 15', 'Date 15',  'Short Description 15' , 10),
  ];

  getEvents(): Observable<Event[]>
  {
    return from([this.events]);
  }

  saveOrder(order: Order): Observable<Order>
  {
    console.log(JSON.stringify(order));
    return from ([order]);
  }
}
