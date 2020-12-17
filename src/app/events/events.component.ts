import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events=[];
  constructor(private eventService:EventsService) { }

  ngOnInit(): void {
    this.eventService.getSpecialEvent().subscribe(
      result=> this.events = result,
      error=>console.log(error)
    )
  }

}
