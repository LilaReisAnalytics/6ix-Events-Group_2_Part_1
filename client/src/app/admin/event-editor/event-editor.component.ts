import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Event} from 'src/app/model/event.model';
import { EventRepository } from 'src/app/model/event.repository';

@Component({
  templateUrl: './event-editor.component.html'
})
export class EventEditorComponent implements OnInit {
  editing = false;
  event: Event = new Event();

  constructor(private repository: EventRepository,
              private router: Router,
              activeRoute: ActivatedRoute)
  {
    this.editing = activeRoute.snapshot.params.mode === 'edit';

    if (this.editing)
    {
      Object.assign(this.event, repository.getEvent(activeRoute.snapshot.params.id));
    }
  }

  ngOnInit(): void {
  }

  save(form: NgForm): void
  {
    this.repository.saveEvent(this.event);
    this.router.navigateByUrl('/admin/main/events');
  }

}
