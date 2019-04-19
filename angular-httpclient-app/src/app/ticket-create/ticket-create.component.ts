import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  @Input() ticketDetails = { category: 0, creator_email: '', subject: '' }
  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() {
    console.log("inside create cons");
  }

  addTicket(dataTicket) {
      this.restApi.createTicket(this.ticketDetails).subscribe((data: {}) => {
      window.alert("Ticket Creation Details: \n"+JSON.stringify(data));
      this.router.navigate(['/tickets-list']);
    })
  }
}
