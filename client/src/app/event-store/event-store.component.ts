import { Component } from '@angular/core';
import { Event } from '../model/event.model';
import { EventRepository } from './../model/event.repository';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-store',
  templateUrl: './event-store.component.html',
  styleUrls: ['./event-store.component.css'],
})
export class EventStoreComponent
{
  public selectedName = null;
  public eventsPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: EventRepository,
              private cart: Cart,
              private router: Router) { }

  get events(): Event[]
  {
    const pageIndex = (this.selectedPage - 1) * this.eventsPerPage;
    return this.repository.getEvents(this.selectedName)
    .slice(pageIndex, pageIndex + this.eventsPerPage);
  }

  get name(): string[]
  {
    return this.repository.getName();
  }

  changeName(newName?: string): void
  {
    this.selectedName = newName;
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.eventsPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number
  {
    return Math.ceil(this.repository
      .getEvents(this.selectedName).length / this.eventsPerPage);
  }

  addEventToCart(event: Event): void
  {
    debugger;
    this.cart.addLine(event);
    console.log(this.cart.lines.length);

    this.router.navigateByUrl('/cart');
  }
  deleteLine(id: number): void
  {
    //const index = this.name.findIndex((l) => l.event._id === id);
   //this.name.splice(index, 1);
    //this.recalculate();
  }
  addEventToList(){

    //this.events.addLine(event);
    //console.log(this.l)

  }
}
