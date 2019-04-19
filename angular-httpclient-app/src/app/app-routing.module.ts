import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-ticket' },
  { path: 'create-ticket', component: TicketCreateComponent },
  { path: 'ticket-details/:id', component: TicketDetailsComponent },
  { path: 'update-ticket/:id', component: TicketUpdateComponent },
  { path: 'tickets-list', component: TicketsListComponent } 
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
