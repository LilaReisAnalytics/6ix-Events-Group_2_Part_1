import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/event.model';
import { EventRepository } from 'src/app/model/event.repository';

@Component({
  templateUrl: './event-table.component.html'
})
export class EventTableComponent implements OnInit {

  constructor(private repository: EventRepository,
              private router: Router) { }

  ngOnInit(): void {
  }

  getEvents(): Event[]
  {
    return this.repository.getEvents();
  }

  deleteEvent(id: number): void
  {
    if (confirm('Are you sure?') && (id !== undefined))
    {
      this.repository.deleteEvent(id);
    }
    else
    {
      window.location.reload(); // refresh fix
      this.router.navigateByUrl('/admin/main/events');
    }
  }

  addEvent(): void
  {
    this.router.navigateByUrl('/admin/main/events/add');
  }

  editEvent(id: number): void
  {
    this.router.navigateByUrl('/admin/main/events/edit/' + id);
  }

}
