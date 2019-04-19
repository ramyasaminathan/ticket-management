import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {
  
  id = this.actRoute.snapshot.params['id'];
  ticketData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.restApi.getTicket(this.id).subscribe((data: {}) => {
      this.ticketData = data;
    })
  }

  updateTicket() {
    if (window.confirm('Are you sure, you want to update?')){
      this.restApi.updateTicket(this.id, this.ticketData).subscribe(data => {
        window.alert("Updation Details: \n"+JSON.stringify(data));
        this.router.navigate(['/tickets-list'])
      })
    }
  }
}
