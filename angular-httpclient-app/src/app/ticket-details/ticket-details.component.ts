import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  id = this.actRoute.snapshot.params['id'];
  Ticket: any = {};
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadTicket();
  }

  loadTicket() {
    return this.restApi.getTicket(this.id).subscribe((data: {}) => {
      this.Ticket = data;
    })
  }

}
