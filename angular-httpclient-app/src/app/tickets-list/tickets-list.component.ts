import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  Ticket: any = [];

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    return this.restApi.getTickets().subscribe((data: {}) => {
      this.Ticket = data;
      for (let ticket of this.Ticket) {
        ticket.status="Assigned";
      }
    })
  }

  deleteTicket(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteTicket(id).subscribe(data => {
      window.alert("Deletion Details: \n"+JSON.stringify(data));
      this.loadTickets();
      })
    }
  }  
}
