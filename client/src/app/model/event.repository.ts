import { Injectable } from '@angular/core';
import { Event } from './event.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class EventRepository
{
  private events: Event[] = [];
  private names: string[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getEvents().subscribe(data => {
      this.events = data;
      this.names = data.map(b => b.name)
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

  getNames(): string[]
  {
    return this.names;
  }
  saveEvent(savedEvent: Event): void
  {
    if (savedEvent._id === null || savedEvent._id === 0 || savedEvent._id === undefined)
    {
      this.dataSource.addEvent(savedEvent).subscribe(b => {
        this.events.push(savedEvent);
      });
    }
    else
    {
      this.dataSource.updateEvent(savedEvent).subscribe(event => {
        this.events.splice(this.events.findIndex(b => b._id === savedEvent._id), 1, savedEvent);
      });
    }
  }

  deleteEvent(deletedEventID: number): void
  {
    this.dataSource.deleteEvent(deletedEventID).subscribe(event => {
      this.events.splice(this.events.findIndex(b => b._id === deletedEventID), 1);
    });
  }
}
