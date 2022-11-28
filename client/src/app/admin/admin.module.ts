import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { EventEditorComponent } from './event-editor/event-editor.component';
import { EventTableComponent } from './event-table/event-table.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
   children: [
      { path: 'events/:mode/:id', component: EventEditorComponent, data: {title: 'Edit Event'}, canActivate: [AuthGuard]},
      { path: 'events/:mode', component: EventEditorComponent, data: {title: 'Add Event'}, canActivate: [AuthGuard]},
      { path: 'events', component: EventTableComponent, data: {title: 'Event Table'}, canActivate: [AuthGuard]},
      { path: 'orders', component: OrderTableComponent, data: {title: 'Order Table'}, canActivate: [AuthGuard]},
      { path: '**', redirectTo: 'event-list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, AdminComponent, OrderTableComponent, EventEditorComponent, EventTableComponent]
})
export class AdminModule {}
