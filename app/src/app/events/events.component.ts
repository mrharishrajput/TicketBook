import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:any=[];
  constructor(private event:EventService) {this.getEvents() }

  ngOnInit(): void {
  }
  getEvents(){
    this.event.getEvents().subscribe(
      data=>{this.events=data,console.log(data)}
 
    )
  }

}
