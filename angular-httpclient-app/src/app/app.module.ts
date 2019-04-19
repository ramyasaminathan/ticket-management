import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketCreateComponent,
    TicketDetailsComponent,
    TicketUpdateComponent,
    TicketsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
