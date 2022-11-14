import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { StaticDataSource } from './static.datasource';
/*import { RestDataSource } from './rest.datasource';*/

@Injectable()
export class EventRepository
{
  private events: Event[] = [];
  private name: string[] = [];

  constructor(private dataSource: StaticDataSource)
  {
    dataSource.getEvents().subscribe(data => {
      this.events = data;
      this.name = data.map(b => b.name)
        .filter((a, index, array) => array.indexOf(a) === index).sort();
    });
  }

  getEvents(name: string = null): Event[]
  {
    return this.events
      .filter(b => name == null || name === b.name);
  }

  getEvent(id: number): Event
  {
    return this.events.find(b => b._id === id);
  }

  getName(): string[]
  {
    return this.name;
  }
}
